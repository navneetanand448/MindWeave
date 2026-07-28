# Mind Weave 🎨

Hey there! Welcome to **Mind Weave**—a real-time, collaborative digital whiteboard I built to make remote brainstorming and visual planning a lot more interactive. 

Think of it as a lightweight Miro clone. You can draw, add sticky notes, drop in shapes, and collaborate with your team in real-time without having to refresh the page. I built this to dive deep into WebSockets, real-time state synchronization, and modern Next.js architecture.

## 🔗 Live Demo
You can check out the live deployment here: **[Mind Weave](https://mind-weave-51hh.vercel.app/)**

---

## ✨ What it does

*   **Real-Time Sync:** See your teammates' cursors, drawings, and edits instantly.
*   **Infinite Canvas:** Pan and zoom across an expansive workspace.
*   **Tools Galore:** 
    *   Freehand drawing (super smooth, thanks to `perfect-freehand`).
    *   Sticky notes, text blocks, rectangles, and ellipses.
*   **Object Manipulation:** Select, resize, reposition, and layer (bring to front/send to back) elements on the fly.
*   **Team Workspaces:** Secure authentication, organization creation, and role-based access so you can keep your boards private to your team.

---

## 🛠️ The Tech Stack

I leaned into the cutting edge of the React ecosystem for this one. Here's what's under the hood:

*   **Frontend Framework:** Next.js 16 (App Router) & React 19
*   **Styling:** Tailwind CSS v4, Shadcn UI, and Radix UI for accessible components.
*   **Database & Backend:** Convex. The entire backend (database, server functions, and API layer) is fully deployed and hosted on Convex. It handles all the heavy lifting for syncing board data and user info out of the box.
*   **Real-Time Engine:** Liveblocks (manages the WebSocket connections for presence and live edits).
*   **Authentication:** Clerk (handles user sign-ins and organization management).
*   **State Management:** Zustand (for localized, fast client-side state).

---

## 💻 Local Development Setup

Want to spin this up on your own machine? Here is how to get it running.

### 1. Prerequisites
Make sure you have **Node.js (v20+)** installed. You'll also need to set up free accounts on [Clerk](https://clerk.com/), [Convex](https://www.convex.dev/), and [Liveblocks](https://liveblocks.io/) to get your API keys.

### 2. Clone and Install
```bash
git clone [https://github.com/your-username/my-app.git](https://github.com/your-username/my-app.git)
cd my-app
npm install
