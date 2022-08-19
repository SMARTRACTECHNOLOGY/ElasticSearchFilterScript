var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('Cannot connect to Elasticsearch.');
        console.error(error);

    } else {
        console.log('Connected to Elasticsearch was successful!');
    }
});



let body = "";
async function getTitle() {

    body = await client.updateByQuery({
        index: 'dumydata',
        refresh: true,
        body: {
            query: {
                bool: {
                    must: [{
                        match: {
                            "barcode": "191533368552350"
                        }
                    }, {
                        match: {
                            "tenantId": "1dd1463e-e28f-406e-b478-9ee958b4ac44"
                        }
                    }]
                }
            }
            , script: {
                inline: "ctx._source.project.description='new';ctx._source.metadata.product.experienceTenantId='nextcode';ctx._source.metadata.product.experienceId='experienceIdNewsss';ctx._source.metadata.product.experienceStudioId='experienceStudioIdNewssss';",
            },
        }
    })

    console.log(body)
}

getTitle().catch(console.log);
