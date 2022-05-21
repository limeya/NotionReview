const { Client } = require('@notionhq/client');
const core = require("@actions/core")

const notion_api_key = core.getInput("notion_api_key", { required: true })
const database_id = core.getInput("database_id", { required: true })

const notion = new Client({ auth: notion_api_key });

(async () => {
  const response = await notion.databases.query({
    database_id: database_id,
    filter: {
      and: [
        {
          property: '状态',
          select: {
            equals: '已总结',
          },
        }
      ],
    },
  });
  console.log(response);
})();
