/**
 * Created by hartger on 30/11/15.
 */
angular.module('app',[])
    .controller('consoleCtrl',function($scope, $timeout, $injector, $location, $http) {

        $scope.doFunc = function(action, arguments) {
            if(angular.isFunction($scope[action])) {
                $scope[action](arguments);
            }
            else {
                console.log(""+action+" is not a function");
            }
        };
        $scope.menu = {text:'',actionitems: [
            {name:'home',action:'goHome'},
            {name:'websites',action:'goWebsites'},
            {name:'profile.json',action:'goProfile'},
            {name:'github',action:'goGithub'}
        ]};
        $scope.path = "~";
        $scope.content = [{text:'[visitor@HVeeman '+$scope.path+'] $> '}];
        setInterval(function(){
            if($scope.cursor=='█'){
                $scope.cursor=' ';
            }
            else {
                $scope.cursor = '█';
            }
        },500);
        setInterval(function(){
            $scope.$digest();
        },50);
        $scope.goHome = function() {
            $scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "clear && cd ~   ",150, $scope.home);
            $scope.path = "~";
            $location.path('/home');
        };
        $scope.goProfile = function() {
            $scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "clear   ",150, $scope.profile);
            $location.path('/profile');
        };
        $scope.goWebsites = function() {
            $scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "clear   ",150, $scope.websites);
            $location.path('/websites');
        };
        $scope.goGithub = function() {
                $scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "clear   ",150, $scope.github);
                $location.path('/github');
        };
        $scope.redirectTo = function(target) {
            var win = window.open(target, '_blank');
            win.focus();
        };
        $scope.addLine = function(prefix,line,speed,callback) {
            var index = $scope.content.length;
            $scope.content[index] ={text: prefix};
            lineArr = line.split('');
            var to = speed;
            async.eachSeries(lineArr,function(e,innercb) {
                setTimeout(function(){
                    $scope.content[index].text += e;
                    innercb();
                }, to);
            },callback)
        };
        $scope.addLines = function(prefix,lines,speed,callback) {
            async.eachSeries(lines,function(line,outercb) {
                if(typeof line == "undefined"){
                        outercb;
                }
                else {
                        var index = $scope.content.length;
                        $scope.content[index] = {text: prefix};
                        lineArr = line.toString().split('');
                        var to = speed;
                        async.eachSeries(lineArr, function (e, innercb) {
                            setTimeout(function () {
                                $scope.content[index].text += e;
                                innercb();
                            }, to);
                        }, outercb)
                    }
            },callback);
        };
        $scope.showMenu= function(callback){
            var f3 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "(click any of the listed directories to navigate)",20,callback || null)};
            var f2 = function(){
                var index = $scope.content.length;
                $scope.content[index] = $scope.menu;
                f3();
            };
            var f1 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"ls ",300,f2)};
            f1();
        };
        $scope.github = function() {
            $scope.content = [];
            var f1 = function(){$http.get('http://api.github.com/users/hartgerv').then(function(data){
                var arr = Object.keys(data.data).map(function (key) {return key+": "+data.data[key]});
                $scope.addLines('', arr,0,$scope.showMenu);
            })};
            $scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "curl -i https://api.github.com/users/hartgerv",50, f1);
        };
        $scope.profile = function() {
            function calculateAge(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }
            $scope.content = [];
            var f2 = function(){$scope.addLines('',[
                '{',
                '"name" : "Hartger Veeman",',
                '"occupation": "Software Engineering Student",',
                '"age": '+calculateAge("1992-6-18")+', ',
                '"location": "Groningen, the Netherlands",',
                '"contact": "HartgerVeeman@gmail.com",',
                '"description": "Hi! I am Hartger, a software engineering student from Groningen, the Netherlands. To me the field of IT is an ever evolving landscape. The rapid progression of technologies inspires me. I would like to be part of this progression. During my studies I work on developing a broad set of skills. I aim to be a flexible professional that can adapt to a fast changing work-field. Besides software engineering, the main focus of my education, I also take part in interdisciplinary courses and workshops. I have chaired multiple committees in my student union, which helped me grow my organisational skills.Right now I am looking for opportunities to learn and further develop my skills in the field of software engineering and web development. During my studies I am available for a part time job." } ',
                '"interests": [',
                '"front-end webdevelopment",',
                '"back-end webdevelopment",',
                '"artificial intelligence"',
                '],',
                '"skills": [',
                '{"Javascript": [',
                '"Front-end and back-end webdevelopment in javascript",',
                '"AngularJS",',
                '"jQuery",',
                '"NodeJS"',
                ']},',
                '{"Php": [',
                '"Laravel"',
                ']},',
                '{"Java": [',
                '"OOP"',
                ']},',
                '{"C": [',
                '"Imperative programming"',
                ']},',
                '{"Misc.: ["',
                '"HTML",',
                '"CSS",',
                '"Linux"',
                ']}',
                ']',
                '"Hobbies": ["music production","philosophy"],',
                '} '
                ],0,$scope.showMenu)};
            var f1 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"cat profile.json",150,f2);$scope.path="app/public";};
            f1();
        };
        $scope.websites = function() {
            $scope.content = [];
            var f11 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "(click any of the listed directories to navigate)",20)};
            var f10 = function(){
                var index = $scope.content.length;
                $scope.content[index] = $scope.menu;
                f11();
            };
            var f9 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"ls",300,f10)};
            var f8 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"cd ..",300,f9);$scope.path="~/app/public"};
            var f7 = function(){var index = $scope.content.length;
                $scope.content[index] = {text:'Everymusic, a soundcloud based online music player (WIP): ', actionitems: [{name:'http://www.everymusic.nl',action:'redirectTo',arguments:'http://www.everymusic.nl'}]};
                f8();
            };
            var f6 = function(){var index = $scope.content.length;
                $scope.content[index] = {text:'Stackoverflow: ', actionitems: [{name:'http://stackoverflow.com/users/4550627/hartger',action:'redirectTo',arguments:'http://stackoverflow.com/users/4550627/hartger'}]};
                f7();
            };
            var f5 = function(){var index = $scope.content.length;
                $scope.content[index] = {text:'Github: ', actionitems: [{name:'https://github.com/HartgerV/',action:'redirectTo',arguments:'https://github.com/HartgerV/'}]};
                f6();
            };
            var f4 = function(){var index = $scope.content.length;
                $scope.content[index] = {text:'LinkedIn: ', actionitems: [{name:'https://nl.linkedin.com/in/hartgerveeman',action:'redirectTo',arguments:'https://nl.linkedin.com/in/hartgerveeman'}]};
                f5();
            };
            var f3 = function(){$scope.addLine(' ',"My presence on the internet:",80,f4);};
            var f2 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"consume <(cat personalprojects schoolprojects socialmedia)",80,f3);};
            var f1 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"cd ~/app/public/websites",100,f2);$scope.path="app/public/websites";};
            f1();
        };
        $scope.home = function() {
            $scope.content = [];
            var f6 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ', "(click any of the listed directories to navigate)",20);console.log($scope.content)};
            var f5 = function(){
                var index = $scope.content.length;
                $scope.content[index] = $scope.menu;
                f6()
            };
            var f4 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"ls",300,f5)};
            var f3 = function(){$scope.addLine('"Hi, I am Hartger! Welcome to my personal website. I am a software engineering student from Groningen, the Netherlands. This site contains information about me and the software engineering related things I do."', "  ",300,f4)};
            var f2 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"echo $WELCOME_MESSAGE",100,f3)};
            var f1 = function(){$scope.addLine('[visitor@HVeeman '+$scope.path+'] $> ',"cd ~/app/public",100,f2);$scope.path="app/public";};
            f1();
        };
        $scope.init = function() {
            $scope.content = [];
            var f5 = function(){$scope.addLine(' ',"boot successful......................",100,$scope.home);console.log($scope.content)};

            var f4 = function(){$scope.addLine('Unknown BootLoader on sda2 00000000 7f ee 19 f5 e1 91 f0 cb 4d 8d c1 45 c0 14 71 6d |........M..E..qm| 00000010 e2 d5 5e 02 ac 65 06 04 00 82 a8 4b 07 81 ff 9c |..^..e.....K....| 00000020 4a 2f 54 25 81 ef 7c 75 97 f1 47 ea d9 5b 78 94 |J/T%..|u..G..[x.| 00000030 3f 06 80 f0 3f f3 ab 08 45 db 98 24 97 58 0c 35 |?...?...E..$.X.5| 00000040 ba 7a 59 a3 50 63 01 a2 e2 73 6f 2e f0 07 02 82 |.zY.Pc...so.....| 00000050 df 7b f7 9f a1 22 47 93 05 0c 26 06 b3 e5 ca 87 |.{..."G...&.....| 00000060 e0 73 f1 4c 26 7b be c9 20 0a 72 a8 3c 07 f9 20 |.s.L&{.. .r.<.. | 00000070 1a 24 0f 87 df 1d 02 12 84 9d 16 03 51 f8 94 10 |.$.S.Ky.N.ET....| 00000080 95 fb 85 c5 d0 94 1e 03 fc d0 78 0f ec 40 3a 80 |..........x..@:.| 00000090 70 37 ff 3f ff aa 08 56 4c ff 8d 4f 0f 95 51 f5 |p7.?...VL..O..Q.| 000000a0 2f 12 84 9a ae 46 2a 72 49 1a 87 7f 44 7b 00 20 |/....F*rI...D{. | 000000b0 0a 6c a1 19 99 e5 df f0 f7 44 af 7f 75 86 0f 09 |.l.......D..u...| 000000c0 40 19 0b f2 17 2a 1f 24 96 0c c1 e1 20 15 92 81 |@....*.$.... ...| 000000d0 ee 5e 9f fc 08 60 c0 87 8a 3c 0c 78 c1 90 29 c0 |.^...`...<.x..).| 000000e0 ff 30 ae 15 be 80 d0 1b ca 47 c2 48 fb 0b e7 3d |.0.......G.H...=| 000000f0 2f ca 89 7e 5c 01 8a c0 36 7c bc 03 3c 24 cf 2a |/..~\...6|..<$.*| 00000100 da a6 51 d0 66 25 50 0e 08 05 e3 df 80 6f ff fb |..Q.f%P......o..| 00000110 9a 06 69 f0 84 0d 27 c1 84 8b f1 28 79 7b 46 bc |..i........(y{F.| 00000120 e1 2f 72 8e cd 01 4b 14 c4 48 60 28 06 08 0a 80 |./r...K..H`(....| 00000130 38 49 12 00 3c bf e1 08 78 ab d5 5a cd 9e 12 95 |8I..<...x..Z....| 00000140 0f 81 be 25 09 40 dc 08 2a f7 09 ce ab 1e d3 c5 |...%.@..*.......| 00000150 c0 79 c0 53 08 84 0b 21 9c 60 60 40 06 55 15 03 |.y.S...!.``@.U..| 00000160 4f 7c ba aa 9f fb 66 80 30 19 5e 04 31 21 52 a5 |O|....f.0.^.1!R.| 00000170 12 17 b2 48 07 3c 23 b2 33 1f 2b f2 92 f5 27 d5 |...H.<#.3.+.....| 00000180 df 99 2e 8a b8 78 05 30 13 06 97 41 21 51 71 77 |.....x.0...A!Qqw| 00000190 bd ef 62 f4 9c 7d 8e e9 f5 51 cc d3 fe c3 cc b4 |..b..}...Q......| 000001a0 80 fb 96 fa 7b ce bf 41 89 c4 e5 77 be bd ee 92 |....{..A...w....| 000001b0 a6 5e f4 4f 95 57 60 66 f2 f8 d5 72 7d 70 00 fe |.^.O.W`f...r}p..| 000001c0 ff ff 82 fe ff ff 02 00 00 00 00 f8 7f 00 00 00 |................| 000001d0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 |................|', "                           ",100,f5);console.log($scope.content)};
            var f3 = function(){$scope.addLine('',"Limiting direct PCI/PCI transfers",60,f4)
            };
            var f2 = function(){$scope.addLine('Drive: sda _____________________________________________________________________ Disk /dev/sda: 320.1 GB, 320072933376 bytes 255 heads, 63 sectors/track, 38913 cylinders, total 625142448 sectors Units = sectors of 1 * 512 = 512 bytes Sector size (logical/physical): 512 bytes / 512 bytes Partition Boot Start Sector End Sector # of Sectors Id System /dev/sda1 * 2,048 616,753,151 616,751,104 83 Linux /dev/sda2 616,755,198 625,141,759 8,386,562 5 Extended /dev/sda5 616,755,200 625,141,759 8,386,560 82 Linux swap / Solaris ',"....",200,f3)};
            var f1 = function(){$scope.addLine('',"initializing..............",60,f2);};
            f1();

        };
        //High tech switch routing! Who needs ngRoute?
        switch($location.path()) {
            case "/home":
                $scope.home();
                break;
            case "/profile":
                $scope.profile();
                break;
            case "/websites":
                $scope.websites();
                break;
            case "/github":
                $scope.github();
                break;
            default:
                $scope.init();
                break;
        }


        console.log($location.path());

    })