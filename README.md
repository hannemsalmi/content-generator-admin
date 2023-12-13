# Admin Page Lightning Web Component (LWC)

## Overview

The `adminpage` component is part of Marketing Content Generator that utilizes GPT-4 API. It erves as the administrative interface for managing system messages and instructions for different content platforms (Instagram, LinkedIn, Email).

## Features

- Update and display the current system message.
- Manage specific instructions for different content types (Instagram, LinkedIn, and Email content generation).
- Update instructions located in backend via HTTP requests.
- Revert to default settings by using reset functionality.

## Component Structure

- `adminpage.html`: The HTML template for the LWC, which includes text areas for input and buttons for performing actions.
- `adminpage.js`: The JavaScript controller for the LWC, which handles the logic for fetching, updating and resetting data.
- `adminpage.css`: The CSS file for styling the LWC.
- `adminpage.js-meta.xml`: The metadata configuration file that defines the component's API version and its target contexts within Salesforce.

## Prerequisites

- Salesforce Org with access to Lightning Web Components.

## Usage

1. Place the `adminpage` component on the desired Salesforce Lightning Page using the Lightning App Builder.
2. Use the text areas provided to update the system message or platform-specific instructions.
3. Click "Update" to send the changes to the backend server.
4. Click "Reset to Default" to revert any changes to the default values provided by the backend.

## Backend Integration

The component interacts with a backend service hosted at `https://marketing-content-generator-02c05e08f82e.herokuapp.com/`.

## API Endpoints

- GET `/get-system-message`: Fetches the current system message.
- POST `/set-system-message`: Updates the system message.
- POST `/reset-system-message`: Resets the system message to default.
- GET `/get-instructions`: Fetches the current instructions for all platforms.
- POST `/update-instructions`: Updates instructions for a specific platform.
- GET `/get-default-instruction/{contentType}`: Fetches the default instruction for a given content type.
