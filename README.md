# Quick walkthrough

## Overview
A premium, interactive web application featuring two **Slot Machine** style reels for selecting meeting hosts and design activities. Built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Features
-   **Dual Slots**: Separate reels for Host and Activity selection.
-   **Smooth Animation**: Vertical scrolling with easing for a mechanical feel.
-   **shadcn/ui Components**: Premium Button components with dark mode.
-   **Tailwind CSS**: Modern utility-first styling with custom design tokens.
-   **Responsive**: Works on desktop and mobile.

## How to Run
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **Open in Browser**:
    Navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## How to Build
To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## Customization
-   **Modify Data**: Edit `src/data.ts` to change the list of hosts or activities.
-   **Adjust Styles**: Edit `src/index.css` to change Tailwind theme variables.
-   **Update Components**: Modify `src/components/SlotMachine.tsx` for behavior changes.
