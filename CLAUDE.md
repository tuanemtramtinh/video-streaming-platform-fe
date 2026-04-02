# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check then bundle for production (tsc -b && vite build)
npm run lint       # Run ESLint across all files
npm run preview    # Preview production build locally
```

No test framework is configured.

## Commit Convention

Commits must follow the Jira ticket format enforced by Husky + GitHub Actions:

```
SCRUM-123: Brief description of change
```

The regex enforced is `[A-Z0-9]+-[0-9]+`. Commits that don't match will be rejected.

## Architecture Overview

This is a React 19 + TypeScript course learning platform (LMS) with role-based client/admin interfaces.

### Data Flow Pattern

All server state follows this three-layer pattern:
1. **Service** (`src/services/*.service.ts`) — raw async functions calling axios
2. **Hook** (`src/hooks/use*.ts`) — wraps service in `useQuery` or `useMutation`
3. **Component/Page** — calls the hook, never calls services directly

### State Management

Two systems work together:
- **React Query** (TanStack Query v5) — server state, caching, invalidation. Query keys pattern: `["resource", ...params]`. Mutations call `queryClient.invalidateQueries` on success.
- **Zustand** (`src/stores/`) — three stores: `useAuthStore` (persisted to localStorage as `"auth-storage"`), `useCourseStore`, `useSectionStore`. Auth store is accessed directly in the axios interceptor via `useAuthStore.getState()`.

### HTTP Client (`src/lib/axios.ts`)

Configured axios instance with two interceptors:
- **Request**: attaches `Authorization: Bearer {accessToken}` from Zustand auth store
- **Response**: on 401, calls `/auth/refresh-token`, updates the store, retries the original request. On refresh failure, calls `logout()` and navigates to `/login`.

### Routing (`src/route.ts`)

React Router v7 with two route trees:
- **Client** (`/`) — wrapped in `AppLayout`. No auth guard on most client routes.
- **Admin** (`/admin`) — wrapped in `RequireAdminAuth` then `AdminLayout`. Guard checks authentication before rendering any admin page.

Nested layout components (`AdminCourseDetailsLayout`, `AdminSectionDetailsLayout`) provide shared UI for admin detail pages.

### File Upload

- **Thumbnails**: FormData with `File` object sent to course/lesson endpoints
- **Videos**: Uppy + AWS-S3 plugin using multipart upload via `/api/s3/presign` and `/api/s3/multipart/*` endpoints. Configuration is in `src/utils/createVideoUppy.ts`.

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL (default: `http://localhost:3000`) |
| `VITE_TINYMCE_API_KEY` | TinyMCE rich text editor API key |
| `VITE_VIDEO_SAMPLE` | Sample YouTube video URL for previews |

### Path Alias

`@/` resolves to `./src` — use this for all internal imports.

### Key Libraries

- **DaisyUI v5** — component classes on top of Tailwind. Use DaisyUI component patterns before writing custom CSS.
- **Vidstack + HLS.js** — video playback in lesson viewer
- **TinyMCE React** — rich text editor for course/lesson descriptions
- **react-toastify** — toast notifications for user feedback
