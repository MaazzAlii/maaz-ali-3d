# Screenshot Guide

All projects and apps currently show `temp.png` as a placeholder.
To add real screenshots, drop the file in the correct folder and
update the `image` field in `lib/data.ts`.

## Project screenshots → public/projects/

| File | Project | Good screenshot to capture |
|------|---------|---------------------------|
| `vision-rag.png` | Vision RAG System | Upload screen + retrieval results panel |
| `document-comparison.png` | Document Comparison | Two docs side-by-side, agent reasoning output |
| `content-pipeline.png` | Content Pipeline | Streamlit UI showing Researcher→Writer→Reviewer flow |
| `context-saver.png` | Chrome Extension | Extension popup open on a ChatGPT conversation |
| `voice-assistant.png` | Voice Assistant | Streamlit UI mid-conversation |
| `tourism-system.png` | North Tourism | Landing page or recommendations grid |

## App screenshots → public/apps/

| File | App |
|------|-----|
| `prayer-times.png` | Prayer Times, Azan & Adhkar — Play Store screenshot |
| `gpa-calculator.png` | Pakistani GPA Calculator — Play Store screenshot |

## Certificate images → public/certifications/

| File | Usage |
|------|-------|
| `navttc.png` | NAVTTC certificate scan/photo |
| `cisco.png` | Cisco Python Essentials certificate |

Then in `lib/data.ts`, set `credentialUrl` to the certificate URL or image path.

## Recommended size

- Projects: **1200 × 750 px** (16:10)
- Apps: **1200 × 675 px** (16:9)
- Use PNG or WebP

## After adding screenshots

No code changes needed — just drop the file in the right folder.
The `onError` fallback in each card switches back to `temp.png`
if a file is missing, so nothing breaks during development.
