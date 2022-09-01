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
        index: 'enablements-gs1',
        refresh: true,
        body: {
            query: {
                bool: {
                    must: [{
                        match: {
                            "barcode": "S22PU"
                        }
                    }, {
                        match: {
                            "tenantId": "fe8e1af3-3d8e-4493-95f9-d17757afe5f1"
                        }
                    }]
                }
            }
            , script: {
		    lang:"painless",
		   
		    inline: "ctx._source.metadata.product.description='Titan Evo 2022 Ash (Small)';ctx._source.metadata.product.experiencetenantid='765';ctx._source.metadata.product.experienceid='243';ctx._source.metadata.product.experiencestudioid='bluebite:es:f601b678-31af-479c-9ce6-cfc92fdc13d0';ctx._source.metadata.product.upc='S22PU-Ash';ctx._source.metadata.barcode[0] = params.data;",
            params:{data:{
	    "code":"S22PU-Ash",
	    "subtype":"UPCA",
	    "type":"1D",
	    "key":"BAR_CODE"}}},
        }
    })

    console.log(body)
}

getTitle().catch(console.log);
