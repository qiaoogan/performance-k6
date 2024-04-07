Grafana Visualization
--

We use Grafana to visualize K6 tests results, need to install and configure grafana and influxdb properly.

### Launch Grafana and InfluxDB service
```shell
docker-compose up -d
```

### Configure InfluxDB
Access `http://localhost:8086` and follow the guidance to complete the initialization and collect below information (with example value):
- username: ariman
- password: password1
- organization: orgariman
- bucket: bucketariman
- token: 3ZtmenhoJkEihz5sv5R1vnwaDEhCR8FGBln-M59EYzr-XQc4jZjPsI7N5Lr1pY4DGmkQHTWlyO0WDocaw4qOfg==

### Configure Grafana
Access `http://localhost:3303` with default credential `admin/admin`, change the password to a new one, e.g. `password1`.

#### Add datasource
Go to Connections -> Data sources to add data source with InfluxDB.
Configure the data source with below information (just for example):
- name: k6influxdb
- query language: flux
- http url: http://influxdb:8086 (use the name of influx service defined in the docker-compose file)
- Auth - basic auth: off
- InfluxDB details - Organization: orgariman
- InfluxDB details - Token: 3ZtmenhoJkEihz5sv5R1vnwaDEhCR8FGBln-M59EYzr-XQc4jZjPsI7N5Lr1pY4DGmkQHTWlyO0WDocaw4qOfg==
- InfluxDB details - Default Bucket: bucketariman
- InfluxDB details - Max series: 1000000

![grafana-datasource-config](../docs/images/grafana-datasource-config.png)

#### Create dashboard

##### create `folder` for better management.
Go to Dashboards -> New -> New folder to add a new folder `k6riman`.

##### add dashboard
Get into the `k6riman` folder and create dashboard by importing a specific JSON file in the `dashboards` folder in this repo,
e.g. `k6riman-grafana.dashboard.json`

![grafana-dashboard](../docs/images/grafana-dashboard.png)

#### Customize grafana panels
Grafana can create different types of panels by querying the data from influxdb as below

![grafana-panel-edit](../docs/images/grafana-panel-edit.png)

You can first enable the `Table view` and input the query codes, then click the refresh button, once get data correctly then select the type of visualization panel can get the graphic panel displayed.

##### Flux query language
It uses flux query language which could be difficult to the beginners, there would be some knowledge preparation required, you can quickly go through below official docs to get a fast understanding of the flux query language, we don't need to become a flux export, just grab some basic knowledge is quite enough for us to construct the query statements:
Basic:
- [flux data model](https://docs.influxdata.com/flux/v0/get-started/data-model/)
- [flux query basics](https://docs.influxdata.com/flux/v0/get-started/query-basics/)
- [query influxDB with flux](https://docs.influxdata.com/influxdb/v2/query-data/get-started/query-influxdb/)
- [transform data with flux](https://docs.influxdata.com/influxdb/v2/query-data/get-started/transform-data/)

Frequent used functions:
- [Group](https://docs.influxdata.com/influxdb/v2/query-data/flux/group-data/)
- [Sort and limit](https://docs.influxdata.com/influxdb/v2/query-data/flux/sort-limit/)
- [Percentile & quantile](https://docs.influxdata.com/influxdb/v2/query-data/flux/percentile-quantile/)

##### Use flux query in influxDB
Once you have the basic knowledge of flux query, you can start create the query scripts, put the query directly in Grafana panel setting page is working, however it's not convenient since you may not know how many and which data are in the database, thus we can use influxdb data explorer which provides a much better UI for creating and verifying the query scripts.

Access your local influxdb service, e.g. `http://localhost:8086`, log in to the dashboard page, on the left menu bar, select Data Explorer icon, then you can get the data explorer page similar as below

![influxdb-dataExplorer-influxQuery-ui](../docs/images/influxdb-dataExplorer-fluxQuery-ui.png)

In above page, you can select your buckets, and select the data key-values from the Filter or Group, the UI will automatically populate all the keys in the database which is much convenient than that in Grafana, after select the data keys, you can choose if apply any functions, be careful, it by default automatically applies an aggregate function to your data, if you don't need that, do uncheck that, lastly click the refresh icon or `SUBMIT` button to execute the query, then you can get the data graph.

After that, click `SCRIPT EDITOR` button, you can get the script editor similar as bellow where you can edit your flux query statements, once you have done the debugging for your scripts, just copy them to Grafana, then you can get the graphic panel displayed correctly.

![influxdb-dataExplorer-influxQuery-script](../docs/images/influxdb-dataExplorer-fluxQuery-script.png)

#### Tricks

##### K6 data in group
When K6 test scripts use `group` to package different scenarios, the test data pushed to influxdb will be grouped into multiple tables,

![k6-data-multiGroup](../docs/images/k6-data-multiGroup.png)

make it draw multiple lines in the graph which probably you just want one line there.

![k6-data-multiGroup-graph](../docs/images/k6-data-multiGroup.graph.png)

Then you can use `group` function to regroup all the data into one table,

![k6-data-multiGroup-regroup](../docs/images/k6-data-multiGroup-regroup.png)

then here will be only one line the graph.

![k6-data-multiGroup-regroup-graph](../docs/images/k6-data-multiGroup-regroup.graph.png)

##### Custom panel legend
For Time series graph, to display multiple lines in a same graph, create multiple queries, one query represent one line, then chose `Overrides` -> Add field override -> Fields returned by query (select query name) -> Standard options Display name (input the name which will be displayed as legend).

![grafana-custom-legend](../docs/images/grafana-custom-legend.png)