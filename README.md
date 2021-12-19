# Vigor

Vigor uses issues to display incidents and labels for severity. Technically, Vigor is the static client-side status page built on React using GitHub Issues for Component and Incident reporting with live updating using the GitHub API.

## Features

- Easy setup
- Show status of your services using Components
- Report Incidents
- Markdown support
- Component and Incident templates
- Easy integration with services and monitoring
- Live updating status page
- Hosting on GitHub Pages or other hosting providers
- Use Zapier Triggers to update the status page

### Deployment

- Run `npm run deploy` this will build the React project and deploy it to the `gh-pages` branch
- Finally make sure GitHub Pages option in your GitHub repository settings is set to use the `gh-pages` branch

You may also want to [configure issue templates for your repository](https://help.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository) which will act as Component and Incident templates. **Including the `status` label in an issue template will allow unauthorised GitHub users to update the status page, this should be added when creating the issue**

## Update

Updating is important to get the latest features and patches

- [This guide](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) should bring you through the steps of syncing your forked version of this repository. Ensure you have backed up your `.env` configuration file as this may be overwritten, you will need to make sure you include the env variables from the latest version

## Configuration

Customise your status page - ensure all required options are entered and any unused optional options are set blank, ie `REACT_APP_MANIFEST=`

- `REACT_APP_MANIFEST` (optional) - Determines the manifest url in the built HTML file
- `REACT_APP_TITLE` (required) - Determines the `<title>` tag in the built HTML file with suffix `Status`
- `REACT_APP_DESCRIPTION` (optional) - Determines the description `<meta>` tag in the built HTML file
- `REACT_APP_LOGO` (optional) - Accepts an image URL and is used in the status page header
- `REACT_APP_NAME` (optional) - Used in the status page header when no `REACT_APP_LOGO` is provided. This will be used in the img alt attribute if a logo is provided
- `REACT_APP_REPOSITORY` (required) - GitHub `username/repository` that Components and Incidents will be fetched from, ie `vedilink/vigor`

## Details

In depth overview of the functionality

- The main status bar logic is as follows: < 70% Components `operational` = "Some systems are experiencing issues", more than 0 Components `major outage` = "Some systems are experiencing a major outage". Otherwise, "All Systems Operational"
- A `Component` each display a current status. To create a Component add tags `issue status`, `component` and a tag for the current status: `operational`, `performance issues`, `partial outage` or `major outage` (if an issue only has `issue status` and `component` it will be listed as `Unknown`) to a GitHub Issue.
- A `Incident` will show in the Incidents section as either `Active` or `Closed` depending whether on the GitHub Issue is Open or Closed. To create an Incident add tags `issue status` and `incident` to a GitHub Issue.
- Issue Status uses the [GitHub API v3](https://developer.github.com/v3) which has a rate limit of 60 requests per hour for unauthenticated requests (Issue Status is client side and will use unauthenticated requests). Issue Status will fetch 15 times per hour, sending 2 requests per fetch / 30 requests per hour (excluding reload button)