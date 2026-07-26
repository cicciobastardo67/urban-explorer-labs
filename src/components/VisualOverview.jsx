import { assetUrl } from '../utils/assetUrl.js'
import { moveArtwork, resetArtwork } from '../utils/artworkMotion.js'

const VIDEO_URL = assetUrl('media/urban-explorer-workflow-overview.mp4')
const WORKFLOW_IMAGE_URL = assetUrl('images/workflows/urban-explorer-four-systems.png')

const productOverviewContent = {
  LUYAGENT: {
    title: 'See the order journey from Telegram chat to seller-confirmed handoff.',
    copy: 'Conversation, catalog, cart, address, payment evidence and receipt stay connected while the seller controls every sensitive decision.',
    alt: 'LUYAGENT order workflow from Telegram conversation through catalog, cart, payment review, seller confirmation and receipt',
  },
  KhmerADV: {
    title: 'See one campaign move from brief to approved channel delivery.',
    copy: 'Brand references, copy, artwork, human approval and publishing permissions remain separated by campaign and visible to the team.',
    alt: 'KhmerADV campaign workflow from brief and brand assets through production, approval and channel delivery',
  },
  'Hermes Post': {
    title: 'See one idea become an approved, scheduled content week.',
    copy: 'A business idea moves through drafting, image preparation, voice review, owner approval and reusable scheduling without losing context.',
    alt: 'Hermes Post content workflow from a business idea through drafting, image approval and weekly scheduling',
  },
  KramOS: {
    title: 'See every document become an evidence-linked human decision.',
    copy: 'Secure intake, OCR, classification, department rules, source-linked findings and reviewer actions remain connected in one audit trail.',
    alt: 'KramOS document workflow from secure intake through evidence checks, human decision and audit export',
  },
}

export function VisualOverview({ compact = false, productName = '', image = '' }) {
  if (compact) {
    const compactImageUrl = image ? assetUrl(image) : WORKFLOW_IMAGE_URL
    const content = productOverviewContent[productName] || {
      title: `See how ${productName} moves through the controlled workflow.`,
      copy: 'The product-specific path keeps its source, checks and human decisions connected from input to output.',
      alt: `${productName} controlled workflow`,
    }
    return (
      <section className="product-section product-visual-overview" aria-labelledby="product-visual-overview-heading">
        <div className="container product-visual-overview__grid">
          <div>
            <p className="product-kicker">Portfolio workflow</p>
            <h2 id="product-visual-overview-heading">
              {content.title}
            </h2>
            <p className="product-visual-overview__copy">
              {content.copy}
            </p>
            <a className="btn btn-secondary" href={compactImageUrl} target="_blank" rel="noreferrer">
              Open the full workflow
            </a>
          </div>
          <a className="product-visual-overview__image product-artwork" href={compactImageUrl} target="_blank" rel="noreferrer" aria-label={`Open the full ${productName} workflow`} onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
            <img src={compactImageUrl} alt={content.alt} loading="lazy" />
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
        <a href={WORKFLOW_IMAGE_URL} target="_blank" rel="noreferrer" aria-label="Open the full-resolution Urban Explorer Labs systems overview">
          <img src={WORKFLOW_IMAGE_URL} alt="Urban Explorer Labs four-system overview connecting LUYAGENT seller operations, KhmerADV campaign operations, Hermes Post content production and KramOS document review to one controlled core" loading="lazy" />
        </a>
        <figcaption>
          Four controlled systems, each with its own operational workflow. Open the artwork at full resolution.
        </figcaption>
      </figure>
    </div>
  )
}
