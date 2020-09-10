class Programs {
    constructor(...programs) {
        this.programs = new Map(programs);
    }
    names() {
        return Array.from(this.programs.keys());
    } 
    alias(program) {
        return this.programs.get(program);
    }
    aliases() {
        return Array.from(this.programs.values());
    }
    entries() {
        return Array.from(this.programs.entries());
    }
}

const programs = new Programs(
    ["math", "matemáticas"], 
    ["reading", "lectura"],
    ["english", "ingles"]
);
export default programs;