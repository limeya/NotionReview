const { Client } = require('@notionhq/client');

// const core = require("@actions/core")
// const notion_api_key = core.getInput("notion_api_key", { required: true })
// const database_id = core.getInput("database_id", { required: true })

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = process.env.DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: '状态',
          select: {
            is_empty: true,
          },
        }
      ],
    },
  });
  console.log(response);
})();
