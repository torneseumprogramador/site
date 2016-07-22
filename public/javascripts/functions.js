var app = window.app || {};
app.showLoading = function(){
  $(".carregando").show();
};

app.hideLoading = function(moveTop){
  setTimeout(function(){
    moveTop = moveTop == undefined ? true : false;
    $(".carregando").hide();
    if(moveTop) app.scrollTop(0);
  }, 500);
};

app.showLoading();

$(document).ready(function(){
  $('#findAula #aula').keypress(function(e){
    if(e.keyCode==13) $('#findAula .button').click();
  });

  if(! document.location.href.match(/(aula\?)|(alunos)|(empresas)|(objetivo)/)){
    app.hideLoading();
  }

  if(app.isIphone()){
    $("#linkTokePag").attr("href", "https://itunes.apple.com/br/app/itau-tokpag/id724817389?mt=8");
    $("#linkItauApp").attr("href", "https://itunes.apple.com/br/app/itau-30-horas/id474505665?mt=8");
  }

  app.loadButtonsActions();
  app.actionFind();
});

app.notEmpty = function(str) {
  return str !== undefined && str !== "undefined" && str !== "" && str !== null && str !== 'null';
};

app.empty = function(str) {
  return !app.notEmpty(str);
};

app.actionFind = function(){
  if(window.location.href.indexOf("aulas") != -1){
    var textFind = app.getParameterByName("q");
    if(app.notEmpty(textFind)){
      textFind = unescape(textFind.replace("#", ""));
      $("#lupa a").trigger("click");
      $("#aula").val(textFind);
      var esperaData = setInterval(function(){
        if(data.length > 0){
          $("#findAula .button").trigger("click");
          clearInterval(esperaData);
        }
      }, 500);
    }
  }
}

app.loadButtonsActions = function(){
  $("#lupa a").click(function(){
    $("#nome_site").hide();
    $("#lupa").hide();
    $("#findAula").show();
    $("#aula").focus();
  });

  $("#findAula .button").click(function(){
    if(window.location.href.indexOf("aulas") == -1){
      window.location.href="/aulas?q=" + $("#findAula input").val();
      return;
    }

    app.findAulaHeader();
  });
}

app.openInternalLink = function(url){
  var id = url.replace('video.html?id=', '');
  window.location.href='aula?id=' + id;
}

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);

  return match ? match[1] : null;
};

app.getYoutubeImagem = function(youtube_url){
  var id_video = app.getIdYoutubeImagem(youtube_url);
  return video_imagem = "http://img.youtube.com/vi/"+ id_video + "/hqdefault.jpg";
};

app.getHtmlVideo = function(youtube_url) {
  app.showLoading()
  var video = app.getIdYoutubeImagem(youtube_url);
  $(".fb-share-button").attr("data-href", "http://www.torneseumprogramador.com.br/aula?id=" + video)
  return "<iframe onload='app.hideLoading()' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allowfullscreen></iframe>";
};

app.getIdYoutubeImagem = function(youtube_url){
  var id_video = youtube_url.split('v=');
  id_video = id_video[1];
  return id_video;
};

app.saveMail = function(){
  var nome = $("#nome");
  var email = $("#email");

  if(nome.val() == ""){
    nome.val("Nome obrigatório");
    setTimeout(function(){
      nome.val("");
      nome.focus();
    }, 800);
    return;
  }

  if(email.val() == ""){
    email.val("Email obrigatório");
    setTimeout(function(){
      email.val("");
      email.focus();
    }, 800);
    return;
  }

  if(email.val().match(/\@.*?\./) == null){
    email.val("Email inválido");
    setTimeout(function(){
      email.val("");
      email.focus();
    }, 800);
    return;
  }

  key_email = email.val().replace(/\@|\.|#|,|\]|\[|\$/g, "")
  var myFirebaseRef = new Firebase("https://scorching-fire-3573.firebaseio.com/emails").child(key_email);
  myFirebaseRef.set({ email: email.val(), nome: nome.val() });

  nome.val("Registrado");
  email.val("Registrado");
  setTimeout(function(){
    nome.val("");
    email.val("");
  }, 800);
}

app.itemFound = false;
app.findAulaHeader = function(stop){
  app.itemFound = false

  $("#videos li div").each(function(){
    var text = $(this).find("p").text();
    var fullText = $(this).find("span").text();
    var findText = $('#aula').val();

    if(app.notEmpty(findText) && app.notEmpty(fullText) && app.notEmpty(text)){
      text = app.accentsTidy(text.toLowerCase());
      fullText = app.accentsTidy(fullText.toLowerCase());
      findText = app.accentsTidy(findText.toLowerCase());

      if(text.indexOf(findText) != -1 || fullText.indexOf(findText) != -1){
        if(!app.itemFound){
          app.itemFound = true;
          $(this).css("background-color", "#FFFFE0");
          var top = $(this).offset().top - 200;
          app.scroll(top, 200);
        }
      }
      else{
        $(this).css("background-color", "#fff");
      }
    }
  });

  if(!app.itemFound){
    if(stop == undefined){
      app.loadForFindHeader(1)
    }else{    
      $('#aula').val("Não encontrado");
      setTimeout(function(){
        $('#aula').val("");
      }, 1200);
    }
  }
}

app.jsLoad=[];
app.loadForFindHeader = function(index){
  var js = 'videos' + index + '.js';
  if(app.jsLoad.indexOf(js) != -1){
    app.findAulaHeader(true);
    return; 
  }
  app.jsLoad.push(js);
  app.loadMore(js,function(){
    app.findAulaHeader(true);
    if(!app.itemFound){
      app.loadForFindHeader(index + 1)
    }
  });
}

app.loadMore = function(file, callback){
  $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
  var s = document.createElement('script');
  s.onload = callback;
  s.setAttribute('src','https://rawgit.com/Didox/torne-se/master/data/' + file);
  document.head.appendChild(s);
}

app.isAndroid = function() {
  return navigator.userAgent.match(/Android/i);
};

app.isIphone = function() {
  return navigator.userAgent.match(/iPhone/i);
};

app.accentsTidy = function(s){
  var r=s.toLowerCase();
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");                
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  return r;
};


app.scroll = function(scrollTo, time) {
  var scrollFrom = parseInt(document.body.scrollTop), i = 0, runEvery = 5;
  scrollTo = parseInt(scrollTo);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}