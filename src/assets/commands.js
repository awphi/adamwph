import { fs, vol } from "memfs";

const fsStart = {
  "/home/guest/adam.txt": "(╯°□°）╯︵ ┻━┻",
  "/home/guest/.hidden.txt":
    "Assuming we're now at the point where a programmer is looking at this ;)",
  "home/guest/bitcoin_miner": bitcoin_miner.toString(),
};

vol.fromJSON(fsStart);

var cwd = "/";

// Override these node working dir methods as memfs relies on them to resolve relative paths
process.cwd = function () {
  return cwd;
};

process.chdir = function (dir) {
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    cwd = dir;
    return true;
  }

  return false;
};

process.chdir("/home/guest");

fs.chmodSync("/home/guest/bitcoin_miner", 0o755);

const Commands = {
  map: {
    help: { cmd: help, desc: "Opens this help menu.", usage: "help" },
    pwd: {
      cmd: pwd,
      desc: "Prints the current working directory.",
      usage: "pwd",
    },
    ls: {
      cmd: ls,
      desc: "Lists files in the given directory.",
      usage: "ls [options] <directory>",
    },
    cat: {
      cmd: cat,
      desc: "Very simple file reading utility.",
      usage: "cat <file>",
    },
    git: {
      cmd: git,
      desc: "Explore my public projects on GitHub.",
      usage: "git",
    },
  },
  execute: function (cmd) {
    var arr = cmd.split(" ");

    var prog = arr[0];
    prog = prog.replaceAll(/\.|\//g, "");

    var ops = arr.splice(1);
    // Remove dupes
    ops = [...new Set(ops)];

    if (prog in this.map) {
      return this.map[prog].cmd(ops);
    }

    if (fs.existsSync(prog)) {
      var stat = fs.lstatSync(prog);
      if (!stat.isDirectory() && stat.mode == 33261) {
        var fn = fs.readFileSync(prog).toString();
        var fnname = prog.split("/").splice(-1);

        // AFAIK, even though eval is very dangerous, since this a client-side app only this *should* be a-okay
        return eval(`${fn} ${fnname}(${JSON.stringify(ops)})`);
      }
    }

    return `bash: ${prog}: command not found`;
  },
};

function bitcoin_miner() {
  // Taken from top answer here https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return `${Math.floor(Math.random() * 5) + 1} BTC mined! Sent to ${makeid(
    32
  )}`;
}

// Coming to the realisation I've spent about 3 hours making a fake file system & fake unix commands for a fake console for a fun little website...

function cat(ops) {
  var e = "cat: ";
  if (ops.length < 1) {
    return e + "requires input file";
  }

  var p = ops[0];
  e += `${p}: `;

  if (!fs.existsSync(p)) {
    return e + "no such file";
  }

  if (fs.lstatSync(p).isDirectory()) {
    return e + "is a directory";
  }

  return fs.readFileSync(p).toString().split("\n");
}

function git() {
  const url = "https://api.github.com/users/awphi/repos";
  var x = fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) =>
      res.map((v) => {
        v.created_at = Date.parse(v.created_at);
        return v;
      })
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((vals) => {
      return vals.sort(function (a, b) {
        return a.created_at - b.created_at;
      });
    })
    .then((vals) =>
      vals.flatMap((o, idx) => [
        `${idx + 1}) ${o.name}`,
        `    Description: ${o.description}`,
        `    Created: ${new Date(o.created_at).toDateString()}`,
        `    Primary language: ${o.language}`,
        " ",
        " ",
      ])
    );

  return x;
}

// Could do a whole fake file system for fun in the future but not super necessary for this quick site
function ls(ops) {
  var a = false;
  var e = "ls: ";
  var dir = process.cwd();

  while (ops.length > 0) {
    var op = ops.pop();

    switch (op) {
      case "-a":
        a = true;
        break;
      default:
        if (op.startsWith("-")) {
          return `ls: unknown option ${op}`;
        } else {
          dir = op;
        }
    }
  }

  e += `${dir}: `;

  if (!fs.existsSync(dir)) {
    return e + "no such directory";
  }

  if (!fs.lstatSync(dir).isDirectory()) {
    return e + "is a file";
  }

  var files = fs.readdirSync(dir);
  files = files.filter((o) => {
    if (a) {
      return o;
    } else if (!o.startsWith(".")) {
      return o;
    }
  });
  return files.join(" ");
}

function pwd() {
  return process.cwd();
}

function help() {
  var l = [];
  for (var i in Commands.map) {
    var o = Commands.map[i];
    l.push(`${i} - ${o.desc}`);
    l.push(`  Usage: ${o.usage}`);
    l.push(" ");
  }
  return l;
}

export default Commands;
