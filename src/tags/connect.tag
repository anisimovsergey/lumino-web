<connect>
  <div class="container">
    <form class="form form-connect" role="form">
      <h1 class="form-connect-heading">Please connect me to your WiFi</h1>
      <br />
      <div class="form-group">
        <label for="name">My name is</label>
        <input id="name" type="text" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="network">WiFi network</label>
        <div class="input-group">
          <input id="network" type="text" class="form-control"/>
          <div class="input-group-btn">
 	    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li><a href="#">BTWifi-with-FON</a></li>
              <li><a href="#">BTWifi-X</a></li>
              <li><a href="#">Virginmedia9996303</a></li>
              <li><a href="#">ESP12801281</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">WiFi password</label>
        <input id="password" type="password" class="form-control"/>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Connect</button>
      </div>
    </form>
  </div>
 <script>
   this.on('mount', function() {
     var dropdown = this.root.querySelector('[data-toggle=dropdown]');
     new Dropdown(dropdown);
     
     fetch('/api/settings')
       .then(function(response) {
        return response.json()
        })
       .then(function(json) {
        console.log('parsed json', json)
        }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
   })
 </script>
</connect>