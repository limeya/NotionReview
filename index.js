const { Client } = require('@notionhq/client');
const fs = require("fs");
const core = require("@actions/core")

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
				equals: '已总结',
			  },
			}
		],
	},
	sorts: [
		{
			property: '漫步函数',
			direction: 'ascending',
		},
	],
  });
//   console.log(response);
  
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
        <p>题目：${title}</p>
        <p>标签：${tags}</p>
        <p>总结：${summary}</p>
        <p>链接：<a href="${url}">文章内容</a></p>
      </body>
    </html>
  `;

//   console.log(context);
	
	core.setOutput('article-item', context)
// 	fs.writeFileSync("index.html", context, "utf8");
 
})();

