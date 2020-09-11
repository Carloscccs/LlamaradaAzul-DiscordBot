const {MessageEmbed,MessageAttachment} = require('discord.js');
const marrycmd = require('./advanced/marry');
const marsnpm = require('marsnpm');
const star = require('star-labs');
const util = require('../util/tools');
const ytdl = require('ytdl-core');

async function controller(client, msg, prefix) {
    if (msg.content.startsWith(prefix)) {
        
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        console.log(command);
        console.log(args);

        if (command === 'ping') {
            msg.reply('pong')
        }

        if (command === 'hello') {
            msg.channel.send(`Hello ${msg.author}`);
        }

        if (command === 'zawardo') {
            var role = msg.channel.guild.roles.cache.find(role => role.name === "Lectura");
            msg.channel.updateOverwrite(role, {
                SEND_MESSAGES: false
            });
            msg.channel.send('Se ha detenido el tiempo en el canal :thumbsup:');
        }

        if (command === 'continue') {
            var role = msg.channel.guild.roles.cache.find(role => role.name === "Lectura");
            msg.channel.updateOverwrite(role, {
                SEND_MESSAGES: true
            });
            msg.channel.send('El tiempo ha vuelto a moverse');
        }


        if (command === 'pararcanal') {
            if (!args.length == 0) {
                var tiempo = Number(args[0]);
                var is = util.isNumber(tiempo);
                if (is) {
                    var role = msg.channel.guild.roles.cache.find(role => role.name === "Lectura");
                    msg.channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    });
                    var currmsg = await msg.channel.send(`Se ha detenido el tiempo en el canal por ${Math.abs(tiempo)} segundos :thumbsup:`);
                    setTimeout(() => {
                        // Edit msg 20 seconds later
                        msg.channel.updateOverwrite(role, {
                            SEND_MESSAGES: true
                        });
                        currmsg.edit('Gracias por esperar, el canal se ha desbloqueado!');
                    }, ((Math.abs(tiempo)) * 1000));
                } else {
                    msg.channel.send(`Ingrese un numero como argumento`);
                }
            } else {
                msg.channel.send(`Ingrese la cantidad de segundos >:l`);
            }
        }

        if (command == 'polnareff') {
            msg.channel.send({
                embed: {
                    description: ':pray: :v: :ok_hand: :man_raising_hand:'
                },
                files: ["https://cdn.discordapp.com/attachments/751467876749410417/751623271040155668/1523983506_ora_ora_ora_vs_muda_muda_muda.gif"]
            });
        }

        if (command == 'casarse') {
            marrycmd.run(client, msg, args);
        }

        if (command == 'ship') {
            let user = msg.mentions.users.first()
            let img = await marsnpm.ship(msg.author.displayAvatarURL({
                format: 'png'
            }), user.displayAvatarURL({
                format: 'png'
            }))
            msg.channel.send({
                files: [img]
            })

        }

        if (command == 'besar') { //Abrimos un nuevo comando
            let aA = msg.author
            let aB = msg.mentions.users.first() //utilizamos las menciones
            const aC = new MessageEmbed();
            if (!aB) {
                var img = await marsnpm.ship(aA.displayAvatarURL({
                    format: 'png'
                }), client.user.displayAvatarURL({
                    format: 'png'
                }));
                aC.setDescription(client.user.tag + ' besó a ' + aA.tag)
                    .setImage(star.kiss())
                    .setFooter(`Comando hecho por **${client.user.username}**`, client.user.displayAvatarURL)
                    .setTimestamp()
                    .attachFiles(new MessageAttachment(img));
            } else {
                aC.setDescription(aA.tag + ' besó a ' + aB.tag)
                    .setImage(star.kiss())
                    .setFooter(`Comando hecho por **${client.user.username}**`, client.user.displayAvatarURL)
                    .setTimestamp();
            }
            msg.channel.send(aC);
        }

        if (command == "zawardo2") {
            let perms = msg.member.hasPermission("ADMINISTRATOR");
            if (!perms) {
                msg.channel.send(`https://2.bp.blogspot.com/-2doKxYeiM5Q/VHXkwPt9yKI/AAAAAAAAUG8/axMeC0DbyNI/s1600/se%C3%B1or%2Bde%2Blos%2Banillos.gif`);
            }
            if (!args.length == 0) {
                var tiempo = Number(args[0]);
                var is = util.isNumber(tiempo);
                if (is) {
                    var role = msg.channel.guild.roles.cache.find(role => role.name === "Lectura");
                    msg.channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    });
                    var currmsg = await msg.channel.send(`Se ha detenido el tiempo en el canal por ${Math.abs(tiempo)} segundos :thumbsup: https://j.gifs.com/QnMkJ0.gif`);
                    setTimeout(() => {
                        // Edit msg 20 seconds later
                        msg.channel.updateOverwrite(role, {
                            SEND_MESSAGES: true
                        });
                        currmsg.edit('El canal retoma su curso! https://j.gifs.com/lx1R55.gif');
                    }, ((Math.abs(tiempo)) * 1000));
                } else {
                    msg.channel.send(`Ingrese un numero como argumento`);
                }
            } else {
                msg.channel.send(`Ingrese la cantidad de segundos >:l`);
            }
        }

        if (command == 'servidores') {
            const embed = new MessageEmbed()
                .setTitle(`** ${client.user.tag} esta actualemente en los siguientes servidores:**`)
                .setDescription("```" + client.guilds.cache.map(r => r.name).join(",\n ") + "```")
                .setFooter("Total de servidores: " + client.guilds.cache.size)
                .setColor("RANDOM");
            msg.channel.send(embed);
        }

        if (command == 'roll') {
            var ran = util.getRandomInt(1, 100);
            msg.channel.send(`Los dados se han lanzado. Has sacado :game_die: **${ran}**`);
        }

        if (command == 'play') {
            let canalvoz = msg.member.voice.channel;

            if (!canalvoz) return msg.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            if (!args[0]) return msg.channel.send('Ingresa una URL de YouTube');
            if (!util.isValidURL(args[0])) return msg.channel.send('La url ingresada no es valida');
            canalvoz.join()
                .then(connection => {
                    const url = ytdl(args[0], {
                        filter: 'audioonly'
                    });
                    dispatcher = connection.play(url);

                    msg.delete();
                    msg.channel.send('Reproduciendo ahora: ' + args[0]);

                }).catch(console.error);
        }

        if (command == 'leave') {
            let canalvoz = msg.member.voice.channel;
            if (!canalvoz) {
                msg.channel.send('No estas conectado a un canal de voz.');

            } else {
                msg.channel.send('Dejando el canal de voz.').then(() => {
                canalvoz.leave();

                }).catch(error => console.log(error));

            }
        }

        if(command == 'pause'){
            let canalvoz = msg.member.voice.channel;
            if (!canalvoz) return msg.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            canalvoz.join().then(connection => {
                dispatcher = connection.dispatcher;
                dispatcher.pause(true);
            });
            msg.channel.send('Pausado');
        }

        if(command == 'resume'){
            let canalvoz = msg.member.voice.channel;
            if (!canalvoz) return msg.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            canalvoz.join().then(connection => {
                dispatcher = connection.dispatcher;
                dispatcher.resume();
            });
            msg.channel.send('Sonando...');
        }
    }
}



module.exports = {
    controller
}