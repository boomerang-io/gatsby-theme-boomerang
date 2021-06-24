const fs = require("fs");
const { execSync } = require("child_process");
const startCase = require("lodash.startcase");
const kebabcase = require("lodash.kebabcase");
const semver = require("semver");

exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "content";
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              pathPrefix
              siteMetadata {
                docsContext
              }
            }
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    id
                    title
                    slug
                    solution
                    version
                    category
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // If the docs are not hosted on the root
        const docsContext = result.data.site.siteMetadata.docsContext || "";

        /**
         * Create pages for docs
         * Get all of the versions of each doc
         * Create redirect for latest version of doc
         */
        const allVersionsOfEachDocMap = {};
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const docId = `${node.fields.category}-${node.fields.solution}-${node.fields.title}`;

          // Must be performed before the page creation because each doc needs to know about
          // the other versions of itself
          if (!allVersionsOfEachDocMap[docId]) {
            const allVersionsOfDoc = [];
            result.data.allMarkdownRemark.edges.forEach(({ node: comparisonNode }) => {
              if (
                comparisonNode.fields.category === node.fields.category &&
                comparisonNode.fields.solution === node.fields.solution &&
                comparisonNode.fields.title === node.fields.title
              ) {
                allVersionsOfDoc.push({
                  version: comparisonNode.fields.version,
                  slug: comparisonNode.fields.slug,
                });
              }
            });

            allVersionsOfEachDocMap[docId] = allVersionsOfDoc;
            const semVersions = allVersionsOfDoc.map((nodes) => nodes.version);
            const latestVersion = semVersions.sort(semver.rcompare)[0];
            const latestDoc = allVersionsOfDoc.find((doc) => doc.version === latestVersion);
            const pathToLatestDoc = latestDoc.slug ? docsContext + latestDoc.slug : "/";
            const pathToLatestDocWithoutVersion = pathToLatestDoc.replace(`/${latestVersion}`, "");

            createRedirect({
              fromPath: pathToLatestDocWithoutVersion,
              toPath: pathToLatestDoc,
              isPermanent: false,
              redirectInBrowser: true,
            });

            // create another redirect ending with "/"
            createRedirect({
              fromPath: `${pathToLatestDocWithoutVersion}/`,
              toPath: pathToLatestDoc,
              isPermanent: false,
              redirectInBrowser: true,
            });
          }

          const pathToDoc = node.fields.slug || "/";
          createPage({
            path: docsContext + pathToDoc,
            component: require.resolve("./src/templates/Docs/index.js"),
            context: {
              id: node.fields.id,
              category: node.fields.category,
              solution: node.fields.solution,
              version: node.fields.version,
              allDocVersions: allVersionsOfEachDocMap[docId],
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);
    const lastUpdatedTimestamp = execSync(`echo $(git log -n 1 --pretty=format:%ct ${parent.absolutePath})`);

    const [solution, version, category] = parent.relativeDirectory.split("/");
    const title = node.frontmatter.title || startCase(parent.name);
    const slug = `/${kebabcase(solution)}/${version}/${kebabcase(category)}/${kebabcase(title)}`;

    createNodeField({
      name: "solution",
      node,
      value: node.frontmatter.solution || solution,
    });

    createNodeField({
      name: "id",
      node,
      value: node.id,
    });

    createNodeField({
      name: "title",
      node,
      value: title,
    });

    createNodeField({
      name: "slug",
      node,
      value: slug,
    });

    createNodeField({
      name: "version",
      node,
      value: node.frontmatter.version || version,
    });

    createNodeField({
      name: "category",
      node,
      value: node.frontmatter.category || category,
    });

    createNodeField({
      name: "index",
      node,
      value:
        typeof node.frontmatter.index === "number" ? `${node.frontmatter.index + 1}` : `${Number.MAX_SAFE_INTEGER}`,
    });

    createNodeField({ node, name: "updatedAt", value: lastUpdatedTimestamp.toString() });
  }
};
