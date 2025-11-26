# Quick walkthrough

## Overview
An interactive web application featuring two **Slot Machine** style reels for selecting meeting hosts and design activities. Built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Features
-   **Dual slots**: Separate reels for Host and Activity selection.
-   **Smooth animation**: Vertical scrolling with easing for a mechanical feel.
-   **shadcn/ui components**: Premium Button components with dark mode.
-   **Tailwind CSS**: Modern utility-first styling with custom design tokens.
-   **Responsive**: Works on desktop and mobile.

## How to run
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start dev server**:
    ```bash
    npm run dev
    ```
3.  **Open in browser**:
    Navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## How to build
To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## Customization
-   **Modify data**: Edit `src/data.ts` to change the list of hosts or activities.
-   **Adjust styles**: Edit `src/index.css` to change Tailwind theme variables.
-   **Update components**: Modify `src/components/SlotMachine.tsx` for behavior changes.
