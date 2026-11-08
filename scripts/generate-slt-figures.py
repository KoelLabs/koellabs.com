"""Render the SLT blog's focused SVG figures from the paper's saved results.

Requires matplotlib and brotli. Input and provenance: public/blog/slt-2026/chart-data.json.
Text is outlined with the website's Inter font; no screen capture or raster charts.
"""
from pathlib import Path
import datetime as dt
import json
import os
import re
import tempfile

os.environ.setdefault('MPLCONFIGDIR', str(Path(tempfile.gettempdir()) / 'koel-matplotlib'))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties, fontManager
from matplotlib.patches import FancyBboxPatch, PathPatch
from matplotlib.path import Path as GlyphPath
from matplotlib.textpath import text_to_path
from matplotlib.transforms import Affine2D, Bbox, ScaledTranslation
from matplotlib.ticker import MultipleLocator
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/blog/slt-2026'
DATA = json.loads((ROOT / 'public/blog/slt-2026/chart-data.json').read_text())
ROWS = DATA['datasets']
BLUE = '#2269b5'
ORANGE = '#ad4d15'
INK = '#192431'
MUTED = '#637083'
GRID = '#e1e7ee'
WHITE = '#ffffff'
plt.rcParams.update({'svg.fonttype': 'path', 'svg.hashsalt': 'koel-slt-2026',
    'axes.spines.top': False, 'axes.spines.right': False,
    'axes.spines.left': False, 'axes.spines.bottom': False,
    'axes.axisbelow': True, 'axes.edgecolor': GRID, 'axes.labelcolor': MUTED,
    'xtick.color': MUTED, 'ytick.color': INK, 'savefig.facecolor': WHITE})
TMP = tempfile.TemporaryDirectory(prefix='koel-slt-fonts-')
FONTS = {}
# The site's Inter (variable), instanced at the two weights the charts use.
for weight, wght in [('Regular', 400), ('Semibold', 600)]:
    face = instantiateVariableFont(TTFont(ROOT / 'app/fonts/Inter-latin.woff2'), {'wght': wght})
    face.flavor = None
    family = f'KoelChartInter{weight}'  # unique family per weight so matplotlib can't mix them up
    # Unique names per weight; matplotlib caches outlines by PostScript name, so a shared
    # name would mix Regular and Semibold glyphs.
    for name_id in (1, 4, 6, 16):
        face['name'].setName(family, name_id, 3, 1, 0x409)
    target = Path(TMP.name) / f'{weight}.ttf'
    face.save(target)
    fontManager.addfont(str(target))
    FONTS[weight] = family
CAP_HEIGHT = face['OS/2'].sCapHeight / face['head'].unitsPerEm  # Same in both weights.
TITLE_X, TITLE_SIZE = .055, 23
TITLE_TRACKING, SUBTITLE_TRACKING = -.025, -.01  # em; display-heading tracking.
# Top inset to the title's cap height equals its left inset (both inches, 10 in wide).
TITLE_INSET = TITLE_X*10
TOP_PAD = TITLE_INSET - (.44 - CAP_HEIGHT*TITLE_SIZE/72)


def font(size=14, bold=False):
    # The site's Inter is a Latin subset; DejaVu Sans supplies ρ, ● and ◆.
    return FontProperties(family=[FONTS['Semibold' if bold else 'Regular'], 'DejaVu Sans'], size=size,
                          weight='bold' if bold else 'normal')


def write(fig, x, y, text, size=14, color=INK, bold=False, **kwargs):
    return fig.text(x, y, text, fontproperties=font(size, bold), color=color, **kwargs)


def tracked(fig, x, y, text, size, tracking, color=INK, bold=False):
    """Left/baseline text outlined with letter-spacing (em), keeping the font's kerning.

    Text is exported as paths, so SVG letter-spacing would have no effect; the
    tracking is applied to the glyph positions before outlining instead."""
    glyphs, glyph_map, _ = text_to_path.get_glyphs_with_font(
        text_to_path._get_font(font(size, bold)), text)
    verts, codes = [], []
    for i, (glyph, gx, gy, scale) in enumerate(glyphs):
        v, c = glyph_map[glyph]
        if len(v):
            verts.extend(np.asarray(v)*scale + [gx + i*tracking*text_to_path.FONT_SCALE, gy])
            codes.extend(c)
    # Anchor at (x, y) in figure fraction so the text moves with everything else when
    # savefig's bbox grows the canvas in any direction.
    transform = (Affine2D().scale(size/text_to_path.FONT_SCALE/72) + fig.dpi_scale_trans
                 + ScaledTranslation(x, y, fig.transFigure))
    fig.patches.append(PathPatch(GlyphPath(verts, codes), facecolor=color, edgecolor='none',
                                 lw=0, transform=transform, figure=fig))


def base(title, subtitle, height=6.5):
    fig = plt.figure(figsize=(10, height))
    tracked(fig, TITLE_X, 1-.44/height, title, TITLE_SIZE, TITLE_TRACKING, bold=True)
    tracked(fig, TITLE_X, 1-.79/height, subtitle, 13, SUBTITLE_TRACKING, color=MUTED)
    return fig


BAR_RADIUS = 6/96  # inches; slight rounding, like the Interspeech post's figures


def rounded_rect(ax, x, y, w, h, radius=BAR_RADIUS, **kwargs):
    """Rectangle in data units with corners that stay circular despite unequal axis scales.
    Set the axis limits before calling."""
    W, H = ax.figure.get_size_inches()
    box = ax.get_position()
    x_in = box.width*W/abs(np.diff(ax.get_xlim())[0])   # inches per x unit
    y_in = box.height*H/abs(np.diff(ax.get_ylim())[0])  # inches per y unit
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle=f'round,pad=0,rounding_size={radius/x_in}',
                                mutation_aspect=x_in/y_in, linewidth=0, edgecolor='none', **kwargs))


def style(ax, xstep=None, ystep=None):
    ax.tick_params(length=0, pad=9)
    for label in ax.get_xticklabels()+ax.get_yticklabels():
        label.set_fontproperties(font(13))
    if xstep:
        ax.xaxis.set_major_locator(MultipleLocator(xstep))
        ax.grid(axis='x', color=GRID, linewidth=.7)
    if ystep:
        ax.yaxis.set_major_locator(MultipleLocator(ystep))
        ax.grid(axis='y', color=GRID, linewidth=.7)


def save(fig, name, title, description):
    target = OUT / f'{name}.svg'
    width, height = fig.get_size_inches()
    top = height + TOP_PAD  # Grow the canvas upward only; chart content keeps its layout.
    # Bottom inset to the lowest content equals the side inset, like the top.
    bottom = fig.get_tightbbox(fig.canvas.get_renderer()).y0 - (TITLE_INSET - 4/96)  # 4px optical trim
    fig.savefig(target, format='svg', bbox_inches=Bbox([[0, bottom], [width, top]]), metadata={
        'Title': title, 'Description': description, 'Creator': 'Koel Labs', 'Date': None})
    # Explicit intrinsic pixel size makes the image's dimensions unambiguous in browsers.
    text = target.read_text()
    width, height = width*96, (top-bottom)*96
    text = re.sub(r'(<svg[^>]*?)width="[^"]+" height="[^"]+"',
                  lambda m: f'{m[1]}width="{round(width)}" height="{round(height)}"', text, count=1)
    target.write_text(text)
    plt.close(fig)
    print(name, f'{round(width)} × {round(height)}', target.stat().st_size, 'bytes')


# One question per chart: how large is the average gap?
fig = base('Accent gaps appear in every evaluation',
           'Average minority-minus-standard WER across 16 systems · percentage points', 7.9)
ax = fig.add_axes([.405, .13, .505, .70])
ys = np.arange(len(ROWS))[::-1]
values = [d['meanGap'] for d in ROWS]
ax.set_xlim(0, 30); ax.set_ylim(-.7, 7.7); ax.set_yticks([])
for y, value in zip(ys, values):
    rounded_rect(ax, 0, y-.22, value, .44, facecolor=ORANGE, alpha=.9, zorder=3)
ax.set_xticks([0, 10, 20, 30]); style(ax, xstep=10)
for y, value, row in zip(ys, values, ROWS):
    ax.text(-.055, y+.15, row['label'], transform=ax.get_yaxis_transform(),
            ha='right', va='center', fontproperties=font(13.5, True), color=INK)
    ax.text(-.055, y-.18, row['minority'], transform=ax.get_yaxis_transform(),
            ha='right', va='center', fontproperties=font(12), color=MUTED)
    ax.text(value+.5, y, f'{value:.1f}', va='center', fontproperties=font(15, True), color=ORANGE)
write(fig, .055, .044, 'Control: Mainstream US English; Southern British English for OpenSLR-83.', 11, color=MUTED)
save(fig, 'average-gaps', 'Accent gaps appear in every evaluation',
     'Mean WER gaps across the 16 systems, using the paper’s fixed minority-accent comparisons. Values are percentage-point differences, not relative changes. Source: Figure 1 and saved score aggregates.')


# Actual calendar spacing; selected labels identify the reversal without 16 tiny logos.
row = next(r for r in ROWS if r['dataset']=='Openslr83')
fig = base('A narrowing gap can widen again',
           'OpenSLR-83 · Irish English minus Southern British English · percentage points', 6.2)
ax = fig.add_axes([.095, .20, .84, .57])
xs = np.array([dt.datetime.fromisoformat(p['date']+'-01') for p in row['points']])
gaps = np.array([p['minority']-p['standard'] for p in row['points']])
ax.fill_between(xs, 0, gaps, color=BLUE, alpha=.065)
ax.plot(xs, gaps, '-o', color=BLUE, lw=2, ms=5, zorder=3)
ax.plot(xs[-4:], gaps[-4:], '-o', color=ORANGE, lw=3, ms=7, zorder=4)
ax.set_ylim(0, 40); ax.set_xlim(dt.datetime(2021,7,1), dt.datetime(2026,2,1))
assert gaps.min() >= ax.get_ylim()[0] and gaps.max() <= ax.get_ylim()[1], 'Clipped gap data'
ax.set_yticks([0, 10, 20, 30, 40]); style(ax, ystep=10)
ax.set_xticks([dt.datetime(y,1,1) for y in range(2022,2027)], ['2022','2023','2024','2025','2026'])
style(ax)
ax.annotate('Qwen3 ASR\n0.7 pp', xy=(xs[-4],gaps[-4]), xytext=(-60,48), textcoords='offset points',
    fontproperties=font(12, True), color=ORANGE, ha='right',
    arrowprops={'arrowstyle':'-', 'color':ORANGE,'lw':1})
ax.annotate('Omnilingual\n8.5 pp', xy=(xs[-1],gaps[-1]), xytext=(-18,62), textcoords='offset points',
    fontproperties=font(12, True), color=ORANGE, ha='right',
    arrowprops={'arrowstyle':'-', 'color':ORANGE,'lw':1})
write(fig, .095, .065, 'Overall trend: ρ = −0.75.  Orange traces the final four evaluated releases.', 11.5, color=MUTED)
save(fig, 'gap-over-time', 'A narrowing gap can widen again',
     'OpenSLR-83 gap by actual model-release date. Lines connect distinct systems in chronological order, not generations of one product. Overall Spearman rho −0.75, p<0.05. Last four gaps: 0.7, 5.1, 5.4, 8.5 percentage points. Source: saved trend score aggregates, as in Figure 1.')


# A documented extreme is an example, followed by the eight-evaluation MD result.
row = next(r for r in ROWS if r['dataset']=='ALLSTAR-HT2')
old = next(p for p in row['points'] if p['model']=='Whisper Large v2')
new = next(p for p in row['points'] if p['model']=='MMS 1B All')
fig = base('The same task. A very different regression.',
           'ALLSTAR HINT 2 · mean word error rate (%) · lower is better', 5.9)
ax = fig.add_axes([.315, .24, .51, .51])
ax.set_xlim(0, 85); ax.set_ylim(-.7,1.7);ax.set_yticks([])
ax.set_xticks([0,20,40,60,80]);style(ax,xstep=20)
for y, label, key in [(1,'Nkore English','minorityUnbounded'),(0,'Mainstream\nUS English','standardUnbounded')]:
    a,b=old[key],new[key]
    ax.plot([a,b],[y,y],color=GRID,lw=10,solid_capstyle='round',zorder=2)
    ax.scatter([a],[y],s=140,c=BLUE,zorder=4,edgecolors=WHITE,linewidths=1.3)
    ax.scatter([b],[y],s=140,c=ORANGE,zorder=4,edgecolors=WHITE,linewidths=1.3)
    ax.text(-.055,y,label,transform=ax.get_yaxis_transform(),va='center',ha='right',fontproperties=font(14,True),color=INK)
    for val, color, offset in [(a,BLUE,-.30),(b,ORANGE,.30)]:
        ax.text(val,y+offset,f'{val:.1f}%',ha='center',va='center',fontproperties=font(14,True),color=color)
    ax.text(1.07,y,f'+{b-a:.1f} pp',transform=ax.get_yaxis_transform(),ha='left',va='center',fontproperties=font(13,True),color=ORANGE)
write(fig,.315,.135,'● Whisper large-v2 · Dec 2022',12,color=BLUE)
write(fig,.315,.075,'● MMS 1B · May 2023',12,color=ORANGE)
save(fig,'regression-example','The same task. A very different regression.',
     'Unbounded mean WER on ALLSTAR HINT 2. Nkore English: 7.0% to 71.7% (+64.7 percentage points); MUSE: 1.3% to 6.6% (+5.3 points). This compares releases from different developers, not a vendor update. Source: saved scores and the paper’s roughly 65-point regression example.')


# Table II's rounded values, including both nonsignificant exceptions.
fig = base('Regressions are larger for the selected minority accents',
           'Mean degradation (MD) · average size of positive later-minus-earlier WER changes', 7.8)
ax = fig.add_axes([.405,.14,.505,.66])
ax.set_xlim(0,19.5);ax.set_ylim(-.7,7.7);ax.set_yticks([])
ax.set_xticks([0,5,10,15]);style(ax,xstep=5)
for y,row in zip(ys,ROWS):
    a,b=row['standardMd'],row['minorityMd']
    ax.plot([a,b],[y,y],lw=3,color=GRID,zorder=2)
    ax.scatter([a],[y],s=65,c=BLUE,zorder=4)
    ax.scatter([b],[y],s=80,marker='D' if row['mdSignificant'] else 'd',
        facecolors=ORANGE if row['mdSignificant'] else WHITE,edgecolors=ORANGE,linewidths=1.4,zorder=5)
    ax.text(-.055,y+.15,row['label'],transform=ax.get_yaxis_transform(),ha='right',va='center',fontproperties=font(13.2,True),color=INK)
    ax.text(-.055,y-.18,row['minority'],transform=ax.get_yaxis_transform(),ha='right',va='center',fontproperties=font(12),color=MUTED)
    ax.text(a,y-.29,f'{a:.1f}',ha='center',va='center',fontproperties=font(11.3),color=BLUE)
    ax.text(b+.4,y+.02,f'{b:.1f}',va='center',fontproperties=font(12.5,True),color=ORANGE)
write(fig,.055,.855,'● Standard-accent control',12,color=BLUE)
write(fig,.43,.855,'◆ Selected minority accent',12,color=ORANGE)
write(fig,.055,.053,'Filled diamonds: significant in the paper’s one-sided bootstrap test (6 of 8).',11,color=MUTED)
write(fig,.055,.018,'MD uses all worsening chronological pairs; it is not the probability of a bad update. Units: pp.',10.5,color=MUTED)
save(fig,'mean-degradation','Regressions are larger for the selected minority accents',
     'Table II mean degradation in percentage points. Filled diamonds denote significance in the paper’s one-sided bootstrap test; hollow diamonds denote the two nonsignificant comparisons (SAA and OpenSLR-83). All eight point estimates are higher for the selected minority accent. MD averages only positive changes over all older/newer model pairs, not only adjacent releases.')


# Each cell is one use of a benchmark by a technical report, not one unique corpus.
fig = base('Accent diversity is rarely an explicit evaluation target',
           '61 model–dataset evaluations in the audited technical reports', 4.5)
ax=fig.add_axes([.075,.31,.85,.39]);ax.set_axis_off()
ax.set_xlim(-.2,16);ax.set_ylim(3.9,-.4)
for i in range(61):
    row,col=divmod(i,16)
    rounded_rect(ax,col,row,.76,.64,facecolor=BLUE if i<12 else '#e5eaf1')
write(fig,.075,.19,'12 explicitly consider accent diversity',14,color=BLUE,bold=True)
write(fig,.075,.09,'49 do not explicitly consider it in the audited English evaluation.',12,color=MUTED)
save(fig,'benchmark-coverage','Accent diversity is rarely an explicit evaluation target',
     'Each square is a benchmark use in the technical-report audit. 12 of 61 explicitly address multiple accents; 49 do not. Repeated benchmark uses count separately. This is evaluation coverage, not the fraction of training data or the number of distinct benchmark families. Source: Tables I, III and IV of the corrected arXiv paper.')
TMP.cleanup()
