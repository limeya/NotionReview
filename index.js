const { Client } = require('@notionhq/client');
const fs = require("fs");

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
  
  const article = response.results[0];
  
  const title = article.properties.Name.title[0].plain_text;
  const tags = article.properties.Tags.multi_select.map(item => item.name).join('/');
  const summary = article.properties.总结.rich_text[0].plain_text;
  const url = article.url;
  
  let context = `
    <html>
     <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     </head>
      <body>
        <p>${title}</p>
        <p>${tags}</p>
        <p>${summary}</p>
        <p><a href="${url}">文章内容</a></p>
      </body>
    </html>
  `;

//   console.log(context);
	fs.writeFileSync("index.html", context, "utf8");
 
})();

