class PriorityQueue<T> {
    private items: [number, T][] = [];

    insert(i, p): void {
        if(this.items.length === 0) {
            this.items.push([p, i]);
            return;
        }

        for(let j = 0; j < this.items.length; j++) {
            if(j === this.items.length - 1) {
                this.items.push([p, i]);
                return;
            }

            if(this.items[j][0] > p) {
                this.items.splice(j, 0, [p, i]);
                return;
            }
        }
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    peek(): T | undefined {
        return this.items[0][1];
    }

    pop(): T | undefined {
        return this.items.shift()[1];
    }

}

export default PriorityQueue;
