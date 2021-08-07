import { fs, vol } from "memfs";

const fsStart = {
  "/home/guest/adam.txt": "(╯°□°）╯︵ ┻━┻",
  "/home/guest/.hidden.txt":
    "Assuming we're now at the point where a programmer is looking at this ;)",
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

const Commands = {
  // Maybe add aliases? not sure
  map: {
    help: help,
    man: help,
    pwd: pwd,
    ls: ls,
    cat: cat,
  },
  failMessage: "Command not found! Try 'help' to see available commands.",
  execute: function (cmd) {
    var arr = cmd.split(" ");
    var prog = arr[0];
    if (prog in this.map) {
      // Grab operands
      var ops = arr.splice(1);
      // Remove dupes
      ops = [...new Set(ops)];
      return this.map[prog](ops);
    }

    return this.failMessage;
  },
};

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

  return fs.readFileSync(p);
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
  return "HELP GOES HERE.";
}

export default Commands;
