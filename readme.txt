List of things I have done:
1) Created the basic layout of the chat application. The server runs on node.js as of now. I had sent you a file named server.js which contains the server code.
2) Created the client chat code. It is extremely basic and it consits only of javascript and HTML(very simple for now). This is named as client.html
3) In order to get the chat application working, you have to first install node.js. If you are using Linux, the command 'su zypper install node.js' should get it done.
4) Once node.js is installed, you have to install socket.io. If the installation fails at first, try specifying the version of socket.io in the command. eg:'su zypper install 
   socket.io@0.8.2'
5) Once you have them both installed, just change your directory to the 'node' directory, and type the command node server.js. This will get the server running.
   The client application can be viewed at localhost:8000. the port can be changed in the server.js file
   
6) Then I have included the LinkedIn authentication file. This is named as authentication.html. It provides the LinkedIn signin button.

   