
// Import modules

const log = require(`./modules/log.js`)
const data_handler = require(`./modules/data_handler.js`)
const nmap_scan = require(`./modules/nmap_scan.js`)
const msf_modules = require(`./modules/msf_modules.js`)
const util = require('./modules/spinnier.js')

// Global Variables 
var ip = ''
var mode = ''
var local_interface = ''
var args = []

startup = async function() {
    process.argv.forEach((val, index) => {
        args.push(val)
    })
    if (args.includes('-t') && args.includes('-i') && (args.includes('-q') || args.includes('-l'))) {
        ip = args[args.indexOf('-t')+1]
        local_interface = args[args.indexOf('-i')+1]

        if (args.includes('-q')) {
            mode = 'quiet'
            log.logo_message()
            nmap_scan.start(ip, mode)
            log.runtime(ip, mode)
        } else if (args.includes('-l')) {
            mode = 'loud'
            log.logo_message()
            log.sig()
            log.divider()
            nmap_scan.start(ip, mode)
            log.runtime(ip, mode)
        } else {
            
        }

    } else {

        if (args.includes('-h')) {
            log.help()
            process.exit()
        } else {
            console.log('invalid startup params')
            console.log('Run node index.js -h for more information')  
        }

    }
}

module.exports = {
    ip,
    local_interface
}




startup()