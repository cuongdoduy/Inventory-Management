# CONTRIBUTING

## Documentation

- Link Figma: [Figma](https://www.figma.com/file/heobThNxEmBZEFxP9QD0ZS/IELTS-PLATFORM?type=design&node-id=570-7927&mode=design&t=K7dNagJwXfzLBvDZ-0)

- Must read: [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Code of conduct

1. Must use the Arrow Function component.
2. Code should be DRY (Don't Repeat Yourself). Reusable logic should be moved into hooks, and reusable UI should be moved into `components`.
3. Variables, functions, and components should have meaningful names that reflect their functionality.
4. Component must be have responsive.
5. Do not use style inline.
6. Using as much as possible tailwind config, in file **tailwind.config.js** (Color, size,….).
7. For all textual content, utilize the <p> tag. For text size and color variations, leverage classes like **text-h1**, **text-primary** and others as needed.

## Step to create a new component

- Pick task on Trello.

- Create a new feat/... branch from develop branch.
- Create a Arrow Function inside `components` or `views` folder.
- For each page, create a dedicated folder within the `views` directory.
- Place page-specific components in their respective folders inside the `views` directory.
- Need to run `npm run lint` before push your code.
- Add reviewer to **@HuynhKhoa1601**, **@VortexDang** or **@cuongdoduy** for your pull request to develop branch.

## Support

For support, message us on Slack channel.
