BIN = cars
CC = gcc
CFLAGS = -Wall -g

$(BIN) : main.c carHelper.o
	$(CC) $(CFLAGS) main.c carHelper.o -o $(BIN)

carHelper.o : carHelper.c carHelper.h
	$(CC) $(CFLAGS) carHelper.c -c

clean:
	rm *.o $(BIN)
