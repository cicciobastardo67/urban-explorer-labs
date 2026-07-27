# Product audit and website claim map

Date: 2026-07-22

This document records the product names, verified capabilities and public claim boundaries used on the Urban Explorer Labs website. The website copy is based on the current local codebases, not invented customer metrics.

## Portfolio names

| Codebase | Public product | Position |
| --- | --- | --- |
| `E:\AgentKhmerOS` | **KramOS** | Evidence-first compliance command center for controlled local pilots |
| `E:\KhmerADV` | **KhmerADV** | Multi-brand campaign production, approval and publishing for agencies |
| `E:\ubundu_Hermes_adv` | **Hermes Post** | Simpler idea-to-post assistant for shops, bloggers and owner-led businesses |
| `E:\LUYAGENT` | **LUYAGENT** | Private sales assistant for Cambodian chat sellers |

## KramOS

Verified product surface: file and folder intake, local extraction and classification, department-specific deterministic checks, mandatory evidence links, reviewer correction/resolve/ignore/override actions, audit trail and operational analytics.

Public boundary: controlled local single-reviewer pilot. It supports compliance work but does not replace legal or professional judgement and does not guarantee an audit result.

Primary evidence: `README.md`, `backend\agentkhmeros\core\guardrails.py`, `backend\agentkhmeros\api\review.py`, `docs\MISSION_CONTROL_DESIGN.md`, `docs\HARDENING_MILESTONE.md`.

## KhmerADV

Verified product surface: brief-to-copy and visual production, local ComfyUI image generation, Remotion output, channel-specific drafts, human approval, publishing queue, telemetry, retries and duplicate protection.

Public boundary: channel availability depends on platform permissions. TikTok remains permission/sandbox dependent. The product is local-first, not fully offline.

Primary evidence: `engine\orchestrator.py`, `server\app.py`, `dashboard\index.html`, test suite.

## Hermes Post

Verified product surface: topic-to-draft workflow, rewriting and approval, image generation, 31-day content calendar, Telegram remote control, Markdown export, correction memory after approval and selected social publishers.

Public boundary: this fork uses a cloud text provider, Nano Banana is selectable but not implemented, and TikTok is not a supported publisher. Manual publishing is the recommended starting mode.

Primary evidence: `app\writer.py`, `app\main.py`, `app\post_queue.py`, `app\media_provider.py`, `app\social_publisher.py`, `app\learning.py`.

## LUYAGENT

Verified product surface: Telegram catalog, search, cart and checkout; Khmer and English flows; stock-aware orders; COD and Cambodian payment methods; seller payment review; handoff; receipts; dashboard; import and local SQLite storage.

Public boundary: Telegram is the implemented channel. Facebook is only a placeholder. The Claude fallback uses Anthropic, so the complete system should not be described as fully offline.

Primary evidence: `DIRECTOR_BRIEF.md`, `bot\flows\order.py`, `core\claude_fallback.py`, `api\routes\analytics.py`, dashboard pages.

## Data-show rule

The interactive website data section is a representative visualization of implemented workflows. Names, counts and statuses are illustrative interface data and are explicitly labelled as not being customer performance claims.
