import { useState } from 'react'
import { assetUrl } from '../utils/assetUrl'
import { moveArtwork, resetArtwork } from '../utils/artworkMotion'

const viewContent = {
  kramos: {
    kicker: 'Evidence review console',
    title: 'Decide with the source still attached.',
    description: 'A representative KramOS review surface: document queue, source page, applied rule, department ownership and human decision history.',
    label: 'KramOS document control',
    note: 'KramOS extracts and links evidence. A named reviewer approves, requests evidence or records an override.',
  },
  khmeradv: {
    kicker: 'Campaign command centre',
    title: 'Run every brand without mixing the work.',
    description: 'A representative KhmerADV workspace: campaign selection, production stages, approval status and channel delivery in one branded operation.',
    label: 'KhmerADV campaign production',
    note: 'KhmerADV coordinates production. A campaign owner approves the brand composition and enables each publishing channel.',
  },
  hermes: {
    kicker: 'Content planning assistant',
    title: 'Turn one idea into an approved content week.',
    description: 'A representative Hermes Post surface: weekly plan, current draft, image status, mobile approval and scheduled handoff.',
    label: 'Hermes Post weekly planner',
    note: 'Hermes Post prepares and schedules content. The business owner keeps the final voice and approves every post.',
  },
  luyagent: {
    kicker: 'Seller operations console',
    title: 'Keep every chat connected to the order.',
    description: 'A representative LUYAGENT surface: attention queue, cart-to-receipt pipeline and explicit seller controls for payments, questions and stock.',
    label: 'LUYAGENT order operations',
    note: 'LUYAGENT moves the order forward. The seller verifies payment evidence and takes over difficult conversations.',
  },
}

const statusClass = (status) => `data-status data-status--${status.toLowerCase().replaceAll(' ', '-')}`

function Status({ children }) {
  return <span className={statusClass(children)}><i />{children}</span>
}

function KramOSView() {
  const [decision, setDecision] = useState('In review')
  const documents = [
    ['Supplier invoice - April', 'Invoice / p. 2', 'Verified', 'Finance'],
    ['Company licence renewal', 'Licence / p. 1', 'In review', 'Corporate'],
    ['Customs declaration', 'Customs / p. 3', 'Needs evidence', 'Import/export'],
    ['Payroll register', 'Payroll / p. 6', 'Verified', 'Garment'],
  ]
  return <div className="data-layout data-layout--split">
    <section className="data-pane"><h3>Documents in review</h3><div className="data-table" role="table">
      <div className="data-table__head" role="row"><span>Document</span><span>Source page</span><span>Status</span><span>Department</span></div>
      {documents.map((row) => <div className="data-table__row" role="row" key={row[0]}>{row.map((cell, index) => <span key={cell}>{index === 2 ? <Status>{cell}</Status> : cell}</span>)}</div>)}
    </div></section>
    <div className="data-stack">
      <section className="data-pane"><div className="data-pane__heading"><h3>Evidence readiness</h3><span>Representative workflow</span></div><div className="data-progress"><i /></div><div className="data-scale"><span>Intake</span><span>Review</span><span>Approval</span></div></section>
      <section className="data-pane"><h3>Department checks</h3><ol className="data-track">{['Tax', 'Audit', 'Customs', 'Logistics', 'Garment', 'ISO', 'Safety'].map((item, index) => <li className={index < 4 ? 'is-complete' : index < 6 ? 'is-review' : ''} key={item}><i>{index + 1}</i><span>{item}</span></li>)}</ol></section>
      <section className="data-pane"><h3>Source lineage</h3><div className="data-lineage"><span>Company licence renewal</span><b>Licence / page 1</b><span>Expiry rule</span><b>Human decision required</b><span>Reviewer action</span><b>{decision}</b></div><div className="data-decision-actions"><button type="button" onClick={() => setDecision('Approved')}>Approve</button><button type="button" onClick={() => setDecision('Evidence requested')}>Request evidence</button><button type="button" onClick={() => setDecision('Override recorded')}>Override</button></div></section>
    </div>
  </div>
}

function KhmerADVView() {
  const stages = [['Copy', 'Complete'], ['Art direction', 'Complete'], ['Image', 'Complete'], ['Brand', 'In review'], ['Approval', 'Waiting'], ['Publish', 'Waiting']]
  return <div className="data-layout data-layout--agency">
    <aside className="data-pane data-campaigns"><h3>Campaigns</h3>{['Hotel launch', 'Retail weekend', 'Factory recruitment'].map((item, index) => <div className={index === 0 ? 'is-selected' : ''} key={item}><span>{item}</span><small>{index === 0 ? 'Run in review' : 'Ready'}</small></div>)}</aside>
    <section className="data-pane data-pipeline"><div className="data-pane__heading"><h3>Production pipeline</h3><span>Hotel launch</span></div><ol>{stages.map(([name, status], index) => <li key={name}><span>0{index + 1}</span><strong>{name}</strong><Status>{status}</Status></li>)}</ol></section>
    <section className="data-pane data-delivery"><h3>Channel delivery</h3>{[['Facebook', 'Ready'], ['Instagram', 'Ready'], ['LinkedIn', 'In review'], ['Telegram', 'Ready'], ['TikTok', 'Permission check']].map(([channel, status]) => <div key={channel}><span>{channel}</span><Status>{status}</Status></div>)}</section>
  </div>
}

function HermesView() {
  const [approved, setApproved] = useState(false)
  const days = [['MON', 'Offer reminder'], ['TUE', 'Product story'], ['WED', 'Open slot'], ['THU', 'Customer tip'], ['FRI', 'Weekend post']]
  return <div className="data-layout data-layout--hermes">
    <section className="data-pane data-calendar"><div className="data-pane__heading"><h3>Content week</h3><span>Drafts, approvals and schedule</span></div><div>{days.map(([day, post], index) => <div className={index === 1 ? 'is-selected' : ''} key={day}><small>{day}</small><strong>{post}</strong><span>{index === 2 ? 'Available' : index < 2 ? 'Approved' : 'Draft'}</span></div>)}</div></section>
    <section className="data-pane data-current-post"><div className="data-pane__heading"><h3>Current post</h3><Status>{approved ? 'Approved' : 'In review'}</Status></div><p>Tell customers what makes this week\'s product useful, then invite them to message the shop.</p><div className="data-post-preview" aria-hidden="true"><i /><i /><i /></div><ol className="data-simple-track">{['Idea', 'Draft', 'Image', 'Approval', 'Scheduled'].map((step, index) => <li className={index < (approved ? 5 : 3) ? 'is-complete' : index === 3 ? 'is-review' : ''} key={step}>{step}</li>)}</ol><button className="data-action" type="button" disabled={approved} onClick={() => setApproved(true)}>{approved ? 'Approved on phone' : 'Approve from phone'}</button></section>
  </div>
}

function LuyagentView() {
  return <div className="data-layout data-layout--seller">
    <section className="data-pane data-orders"><h3>Orders needing attention</h3>{[['Order A-1048', 'Payment review', 'ABA'], ['Order A-1049', 'Seller confirmation', 'COD'], ['Order A-1050', 'Human handoff', 'Telegram'], ['Order A-1051', 'Ready', 'Wing']].map(([order, status, method]) => <div key={order}><strong>{order}</strong><Status>{status}</Status><span>{method}</span></div>)}</section>
    <section className="data-pane data-seller-flow"><h3>Order pipeline</h3><ol>{['Conversation', 'Cart', 'Address', 'Payment', 'Confirmation', 'Receipt'].map((step, index) => <li className={index < 4 ? 'is-complete' : index === 4 ? 'is-review' : ''} key={step}><i>{index + 1}</i><span>{step}</span></li>)}</ol></section>
    <aside className="data-pane data-attention"><h3>Seller control</h3><div><span>Payment evidence</span><b>Verify or reject</b></div><div><span>Unanswered question</span><b>Reply and resolve</b></div><div><span>Low stock</span><b>Update product</b></div></aside>
  </div>
}

const renderers = { kramos: KramOSView, khmeradv: KhmerADVView, hermes: HermesView, luyagent: LuyagentView }

export function ProductDataShow({ initialView = 'kramos', productName = '', artwork = '', artworkAlt = '' }) {
  const ActiveView = renderers[initialView] || KramOSView
  const content = viewContent[initialView] || viewContent.kramos

  return <section id="data-show" className="product-data-show" aria-labelledby="data-show-heading"><div className="container">
    <div className="data-show-intro">
      <div className="data-show-heading">
        <p className="product-kicker">{content.kicker}</p>
        <h2 id="data-show-heading">{content.title}</h2>
        <p>{content.description}</p>
      </div>
      {artwork && (
        <figure className="data-show-artwork product-artwork" onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
          <img src={assetUrl(artwork)} alt={artworkAlt} loading="lazy" />
        </figure>
      )}
    </div>
    <div className="data-product-bar"><span>{productName}</span><strong>{content.label}</strong><span>Representative local workflow</span></div>
    <div className="data-frame"><ActiveView /></div>
    <div className="data-human-note"><span aria-hidden="true">H</span><div><strong>Human approval remains visible.</strong><p>{content.note}</p></div></div>
  </div></section>
}
