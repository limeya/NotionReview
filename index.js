const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = process.env.ARTICLE_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
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
