class EmptyStackException implements Error {
    message: string;
    name: string;
}

class Stack<T> {
    private array: T[] = [];

    pop(): T | undefined {
        if (this.isEmpty()) throw new EmptyStackException();

        return this.array.pop();
    }

    push(data: T): void {
        this.array.push(data);
    }

    peek(): T {
        if (this.isEmpty()) throw new EmptyStackException();

        return this.array[this.array.length - 1];
    }

    isEmpty(): boolean {
        return this.array.length === 0;
    }
}

export default Stack;
