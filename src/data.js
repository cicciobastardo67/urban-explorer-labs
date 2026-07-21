import {
  Bot,
  CheckCircle2,
  FileSearch2,
  Languages,
  LockKeyhole,
  Megaphone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const solutions = [
  {
    id: "sales-automation",
    number: "01",
    title: "Sales Automation Systems",
    product: "LUYAGENT",
    copy: "Answers customers, guides orders, and keeps seller data on hardware they own.",
    link: "Explore Sales Automation",
    Icon: Bot,
    signal: "Always-on sales with human handoff",
  },
  {
    id: "document-intelligence",
    number: "02",
    title: "Compliance & Document Intelligence",
    product: "KHAudit · Agent Khmer OS",
    copy: "Turns multilingual documents into evidence-linked review workflows.",
    link: "Explore Document Intelligence",
    Icon: FileSearch2,
    signal: "Deterministic findings, cited evidence",
  },
  {
    id: "media-automation",
    number: "03",
    title: "Media Automation",
    product: "KhmerADV · Hermes",
    copy: "Connects copy, imagery, approval, and publishing in one controlled workflow.",
    link: "Explore Media Automation",
    Icon: Megaphone,
    signal: "Create, review, approve, publish",
  },
];

export const proofItems = [
  {
    product: "LUYAGENT",
    copy: "FAQ, order, payment, stock, confirmation, and human handoff flows.",
    Icon: Bot,
    tags: ["Order flow", "Payment states", "Human handoff"],
  },
  {
    product: "Agent Khmer OS",
    copy: "Evidence-centric guardrails with deterministic findings and human approval.",
    Icon: ShieldCheck,
    tags: ["Evidence", "Guardrails", "Approval"],
  },
  {
    product: "KhmerADV",
    copy: "A proven brief-to-copy-to-image-to-brand-to-publish workflow.",
    Icon: Megaphone,
    tags: ["Brief", "Create", "Publish"],
  },
];

export const controlPrinciples = [
  { label: "Local-first", Icon: LockKeyhole },
  { label: "Human-approved", Icon: UserCheck },
  { label: "Evidence-linked", Icon: CheckCircle2 },
  { label: "Khmer-ready", Icon: Languages },
];
