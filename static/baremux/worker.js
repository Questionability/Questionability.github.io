!function(){"use strict";const e=globalThis.Response;let t=null;function s(e,t,s){console.error(`error while processing '${s}': `,t),e.postMessage({type:"error",error:t})}async function a(s,a,n){const o=await n.request(new URL(s.fetch.remote),s.fetch.method,s.fetch.body,s.fetch.headers,null);if(!function(){if(null===t){const e=new MessageChannel,s=new ReadableStream;let a;try{e.port1.postMessage(s,[s]),a=!0}catch(e){a=!1}return t=a,a}return t}()&&o.body instanceof ReadableStream){const t=new e(o.body);o.body=await t.arrayBuffer()}o.body instanceof ReadableStream||o.body instanceof ArrayBuffer?a.postMessage({type:"fetch",fetch:o},[o.body]):a.postMessage({type:"fetch",fetch:o})}let n=null,o="";function r(){return new Error("there are no bare clients",{cause:"No BareTransport was set. Try creating a BareMuxConnection and calling setTransport() or setManualTransport() on it before using BareClient."})}function c(e,t){const s=n;let a=[t];e.fetch?.body&&a.push(e.fetch.body),e.websocket?.channel&&a.push(e.websocket.channel),s.postMessage({message:e,port:t},a)}function i(e){e.onmessage=async e=>{const t=e.data.port,i=e.data.message;if("ping"===i.type)t.postMessage({type:"pong"});else if("set"===i.type)try{const e=async function(){}.constructor;if("bare-mux-remote"===i.client.function)n=i.client.args[0],o=`bare-mux-remote (${i.client.args[1]})`;else{const t=new e(i.client.function),[s,a]=await t();n=new s(...i.client.args),o=a}console.log("set transport to ",n,o),t.postMessage({type:"set"})}catch(e){s(t,e,"set")}else if("get"===i.type)t.postMessage({type:"get",name:o});else if("fetch"===i.type)try{if(!n)throw r();if(n instanceof MessagePort)return void c(i,t);n.ready||await n.init(),await a(i,t,n)}catch(e){s(t,e,"fetch")}else if("websocket"===i.type)try{if(!n)throw r();if(n instanceof MessagePort)return void c(i,t);n.ready||await n.init(),await async function(e,t,s){const[a,n]=s.connect(new URL(e.websocket.url),e.websocket.origin,e.websocket.protocols,e.websocket.requestHeaders,(t=>{e.websocket.channel.postMessage({type:"open",args:[t]})}),(t=>{t instanceof ArrayBuffer?e.websocket.channel.postMessage({type:"message",args:[t]},[t]):e.websocket.channel.postMessage({type:"message",args:[t]})}),((t,s)=>{e.websocket.channel.postMessage({type:"close",args:[t,s]})}),(t=>{e.websocket.channel.postMessage({type:"error",args:[t]})}));e.websocket.channel.onmessage=e=>{"data"===e.data.type?a(e.data.data):"close"===e.data.type&&n(e.data.closeCode,e.data.closeReason)},t.postMessage({type:"websocket"})}(i,t,n)}catch(e){s(t,e,"websocket")}}}new BroadcastChannel("bare-mux").postMessage({type:"refreshPort"}),self.onconnect=e=>{i(e.ports[0])}}();
//# sourceMappingURL=worker.js.map