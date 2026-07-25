import { assetUrl } from '../utils/assetUrl.js'
import { moveArtwork, resetArtwork } from '../utils/artworkMotion.js'

const VIDEO_URL = assetUrl('media/urban-explorer-workflow-overview.mp4')
const WORKFLOW_IMAGE_URL = assetUrl('media/urban-explorer-visual-workflow.webp')

export function VisualOverview({ compact = false, productName = '', image = '' }) {
  if (compact) {
    const compactImageUrl = image ? assetUrl(image) : WORKFLOW_IMAGE_URL
    return (
      <section className="product-section product-visual-overview" aria-labelledby="product-visual-overview-heading">
        <div className="container product-visual-overview__grid">
          <div>
            <p className="product-kicker">Portfolio workflow</p>
            <h2 id="product-visual-overview-heading">
              See where {productName} fits into the controlled workflow.
            </h2>
            <p className="product-visual-overview__copy">
              Verified source material enters a product-specific path, passes a final quality check, and leaves through standard export settings.
            </p>
            <a className="btn btn-secondary" href={compactImageUrl} target="_blank" rel="noreferrer">
              Open the full workflow
            </a>
          </div>
          <a className="product-visual-overview__image product-artwork" href={compactImageUrl} target="_blank" rel="noreferrer" aria-label="Open the full Urban Explorer Labs visual workflow" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
            <img src={compactImageUrl} alt="Urban Explorer Labs visual workflow showing verified inputs, security exclusions, four product-specific visual pipelines, quality checks, and standard exports" loading="lazy" />
          </a>
        </div>
      </section>
    )
  }

  return (
    <div className="visual-overview" id="visual-overview">
      <div className="visual-overview__lead">
        <div className="visual-overview__copy">
          <p>How the systems work together</p>
          <h3>Verified inputs. Product-specific automation. Human quality control.</h3>
          <span>
            Watch the portfolio overview, then explore the complete visual workflow from secure source material to reviewed, export-ready output.
          </span>
        </div>
        <div className="visual-overview__video">
          <video
            controls
            playsInline
            preload="metadata"
            aria-label="How Urban Explorer Labs automates Cambodian workflows"
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
      </div>

      <figure className="visual-overview__workflow">
        <a href={WORKFLOW_IMAGE_URL} target="_blank" rel="noreferrer" aria-label="Open the full-resolution Urban Explorer Labs visual workflow">
          <img src={WORKFLOW_IMAGE_URL} alt="Urban Explorer Labs visual content workflow showing verified public sources, prohibited private data, KramOS, KhmerADV, Hermes Post and LUYAGENT asset pipelines, quality checking, and PNG export" loading="lazy" />
        </a>
        <figcaption>
          Visual content workflow. Open the diagram to inspect the full-resolution process.
        </figcaption>
      </figure>
    </div>
  )
}
