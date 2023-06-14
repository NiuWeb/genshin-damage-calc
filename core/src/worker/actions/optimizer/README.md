The optimizer workers are connected as shown on this diagram:
```
                                         <------> [Child Worker]
[Main thread] <------> [Main Worker] <----------> [Child Worker]
                                         <------> [Child Worker]
```
the main worker send chunks of rows to each child to be evaluated,
then each child returns the evaluated results to the main worker,
who instert and sorts them to finally returns the result to the main thread.