<html>
  <head>
    <link rel="stylesheet" type="text/css" href="../../../static/stylesheets/css/main.css">
    <script src="../../../static/javascript/js/jquery-2.1.1.min.js" ></script>
    <script src="../../../static/javascript/js/main.js" ></script>
  </head>
  <body class="lab11Theme">

    <div id="navBar">
      <ul class="center">
        <a href="../../../"><li>Home</li></a>
        <a href="../../tutorials/"><li>Tutorials</li></a>
        <a href="../../labs/"><li>Labs</li></a>
        <a href="../../info/"><li>Info</li></a>
      </ul>
    </div>

    <h1 class="centerText navPadding title">The Last Lab!</h1>
    <h2 class="centerText">
      &#8220;
        <?php
          $quotes = array(
            "And will you succeed? Yes you will indeed! (98 and 3/4 percent guaranteed.)",
            "Sometimes the questions are complicated and the answers are simple.",
            "Think left and think right and think low and think high.\nOh, the things you can think up if only you try!",
            "Oh, the thinks you can think!",
            "It is better to know how to learn than to know.",
            "Just tell yourself, Duckie, you’re really quite lucky!",
            "Sometimes you will never know the value of a moment, until it becomes a memory.",
            "Everything stinks till it’s finished.",
            "Now my troubles are going to have troubles with me!"
          );

          $randNum = rand(0,(sizeof($quotes) - 1));

          echo $quotes[$randNum];
        ?>
      &#8221;
    </h2>
    <h2 class="centerText bottomPadding">- Dr. Seuss</h12>
    <h1 class="centerText">Link To This Page</h1>
    <div class="center" id="forceCode2">
      <h1 class="centerText bottomPadding">babbage.cs.missouri.edu/~mbwxd4</h1>
    </div>

    <h1 class="centerText topPadding">Include These Yo!</h1>
    <br>
    <div class="center" id="forceCode2">
      <h1>// Your name</h1>
      <h1>// Your Pawprint</h1>
      <h1>// Lab Code: </h1>
    </div>
    <br>
    <h1 class="centerText">SUBMISSION CODE</h1>
    <br>
    <div class="center" id="forceCode2">
      <h1 class="centerText">cs_submit CS2050_LAB-E lab11 lab11.tgz</h1>
    </div>
    <br>
    <h1 class="centerText">KINDA USEFUL STUFF</h1>
    <br>
    <div id="forceCode2" class="center">
      <h1 class="centerText"><a href="parser.h" download>lab 11 Header file</a></h1>
      <h1 class="centerText"><a href="letter.txt" download>lab 11 Example input file</a></h1>
    </div>
    <br>
    <h1 class="centerText">Example File Read Loop</h1>
    <br>
    <div id="forceCode2" class="center">
      <h1>char* token = "";</h1>
      <h1>char buffer[MAX_LINE];</h1>
      <br>
      <h1>while (fgets(buffer, MAX_LINE, file) != NULL) {</h1>
        <br>
        <h1 class="tab">if (buffer[strlen(buffer) - 1] == '\n') {</h1>
          <h1 class="tab2">buffer[strlen(buffer) - 1] = '\0';</h1>
          <h1 class="tab">}</h1>
        <br>
        <h1 class="tab">token = strtok(buffer, " \n\r\t");</h1>
        <br>
        <h1 class="tab">while (token != NULL) {</h1>
          <br>
          <h1 class="tab2">//Insert function call logic here</h1>
          <br>
          <h1 class="tab2">token = strtok(NULL, " \n\r\t");</h1>
          <h1 class="tab">}</h1>
      <h1>}</h1>
    </div>
    <br>
    <h1 class="centerText">Bonus Points For Listening To These And Crying Before You Leave</h1>
    <br>
    <div id="forceCodeSmall" class="center">
      <iframe width="420" height="315" src="http://www.youtube.com/embed/nSz16ngdsG0" frameborder="0" allowfullscreen></iframe>
      <br>
      <iframe width="420" height="315" src="http://www.youtube.com/embed/-w6m-nhUcos" frameborder="0" allowfullscreen></iframe>
      <br>
      <iframe width="420" height="315" src="http://www.youtube.com/embed/DDOL7iY8kfo" frameborder="0" allowfullscreen></iframe>
      <br>
      <iframe width="420" height="315" src="http://www.youtube.com/embed/rKn9pB8YzKI" frameborder="0" allowfullscreen></iframe>
    </div>
    <br>
  </body>
</html>
