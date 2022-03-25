---
date: 2021-04-09
category: Principles
title: After you enter URL...
cover: /images/img_07.png
---

<!-- more -->

## After you enter URL...

Suppose, you enter the following URL on the browser:

`http://ngninja.com/posts/javascript-closures-made-super-easy`

### 1. Parse the URL
The browser first parses the above URL and finds out the following information:

```
Protocol: HTTP
Host: ngninja.com
Port: (not necessary in this case as the server is listening on the default HTTP port)
Path: /javascript-closures-made-super-easy
```
![](/images/url1.jpg)

### 2. Check the cache

Once the browser is finished parsing the above information, it checks its cache to see if any previous request was made to the same URL. If it finds such entry and that cache entry is not expired, it just decodes the response of that request and renders it appropriately [refer step #7](#jump).

![](/images/url2.jpg)

### 3. Contact OS for the IP address of the server

If it does not find any such cache object, it checks with the OS of the system- if it has a cached copy of the IP address of the domain (ngninja.com).

![](/images/url3.jpg)

### 4. OS responds with the IP address

If the OS has the IP address- great! It just forwards it to the browser.

If the OS does not have the IP address, a request is made to the configured DNS server of your machine.

> A DNS server is nothing but a database of network names and its IP addresses.

![](/images/url4.jpg)

If the requested DNS server knows the domain - you are at luck. If not, it calls another DNS server which is configured for deferring its requests. This process happens recursively until the domain is found, or until the request is timed out.

In case, no record of that domain is found- browser gives an error something like `Cannot find the server ngninja.com.`

But assuming the record is found, the OS gets the IP address from the DNS server, and it is then forwarded to the browser.

### 5. HTTP request is made

The browser now has a valid IP address for the requested domain. The browser then gathers all the request data to be sent to the server. Then the browser sets up a TCP connection with the server with that IP address and sends the HTTP request to the server.

The request consists of **metadata in the header** of the request and **optional data in its body**.

A simple HTTP request will look something like this:

#### General information:

```
Request URL: http://ngninja.com/posts/javascript-closures-made-super-easy
Request Method: GET
Status Code: 200 OK
```

#### Header content:
```
Accept: text/html,application/xml
Accept-Language: en-US,en;q=0.8,hi;q=0.6,it;q=0.4
Connection: keep-alive
Host: www.cs.virginia.edu
```


### 6. Server responds

After the server receives the request from the browser, it processes it and sends back a response to the browser. Type of the response depends on the request being made. The response may contain a JSON object, an XML object, an image file, a video file, or something else.

Also, browsers are intelligent enough to **decode errors** sent by the servers. Based on the error’s status codes it acts appropriately. For example, 200 status code means it’s a successful request. 401 status code means the user is not authorized to make the request, and so on.

<span id="jump"></span> 

### 7. Browser renders 

Finally, when the browser receives the response, it renders that HTML page. And, if the response is cacheable, the browser **stores it in the cache** for future requests to the same path.

[Rendering Details](./render.md) See my blog.





