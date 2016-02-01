/*
  A simple program that shows some differnt ways to use structs. Note the differnt ways you can access members of a structure from auto derefrencing with a -> or dot notation
  when you already have a derefrenced struct.
*/

#include <stdio.h>
#include <stdlib.h>

#define ARRAY_SIZE 3

//Note the typedef will replace the need for typing "struct" before the data type
//This implicitly defines a blank name for our struct then replaces every occurance of "Computer" with "struct Computer"
//(Not exactly but for sake of arugment let's say thats what it does)
typedef struct {
  char* brand;
  float price;
  int quantity;
} Computer;

//Alternative way
//Requires typing struct

// struct Computer {
//   char* brand;
//   float price;
//   int quantity;
// };

//Define Prototypes
void loadData(Computer*, char*, float, int);;
void printData(Computer*, int);

int main(int argc, char* argv[]) {

    //Define an array of Computer Structs
    Computer* computers = malloc(sizeof(Computer) * ARRAY_SIZE);

    //Load some data into our array using our function
    loadData(&computers[0], "Apple", 1999.99, 2);
    loadData((computers + 1), "Dell", 599.99, 4);
    loadData(&computers[2], "Microsoft", 1599.99, 1);

    //Print out all our data
    printData(computers, ARRAY_SIZE);

    //Free our memory allocated
    free(computers);

    return 0;
}

//A function that simply sets some infor into our passed in computer pointer
void loadData(Computer* computer, char* brand, float price, int quantity) {
  computer->brand = brand;
  computer->price = price;
  computer->quantity = quantity;
}

//Displays all the infor in a passed in array
void printData(Computer* computers, int size) {

    int i = 0;
    int j = 0;

    for(i = 0; i < size; ++i) {
      //Print our multiple for differnt quantities
      for(j = 0; j < (computers + i)->quantity; ++j) {
        printf("Brand: %-10s Price: %-5.2f\n", computers[i].brand, (*(computers + i)).price);
      }
    }

}
