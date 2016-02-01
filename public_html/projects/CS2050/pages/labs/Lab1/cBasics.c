//Adds the standard input/output library for functions like printf and scanf to be used
#include <stdio.h>

//Includes the string libaray for strcpy
#include <string.h>

//Define our function prototype for our function below
//This is required because C is intrepreted from the top down so the memory size for our functions will need to be defined before we call it.
int checkPerson(char*,int);

int main(int argc, char* argv[]) {
/*          ^           ^
            |           |
  number of arguments   |
                        |
                  argument names
*/

  //BASIC DATA TYPES

  //AGAIN NEVER USE x OR UNDESCRIPTIVE VARIABLE NAMES IN YOUR CODE THIS IS JUST FOR EXAMPLE PURPOSES.

  //Create a new integer
  int x = 734;
  printf("Int: %d\n", x);

  //Create a new long
  long y = 734734734;
  printf("Long: %ld\n", y);

  //Creae a new float
  //Note the .3 in printf, this just specifies printf to print up to 3 decimal places
  float xx = 734.734;
  printf("Float: %.3f\n", xx);

  //Create a new double
  double yy = 734.734734734;
  printf("Double: %lf\n", yy);

  //Create a new char
  char letter = 'A';
  printf("Char: %c\n", letter);

  //Create a new String
  char* name = "Michelle";
  //Same as above
  char name2[] = {'M','i','c','h','e','l','l','e','\0'};
  printf("String: %s\n", name);


  //USER DEFINED DATA TYPES

  //Structures

  //Define the struct
  typedef struct {
    int age;
    char name[20];
  } Person;

  //Create a new variable joe of type Person
  Person joe;
  joe.age = 22;
  //Note you cannot directly reassign arrays so you need to use the strcpy function.
  //This works like you would think joe.name = "Joe" would. (IT DOES NOT THOUGH)
  strcpy(joe.name, "Joe");

  printf("Joe.age: %d\n", joe.age);
  printf("Joe.name: %s\n", joe.name);

  //CASTING DATA TYPES TO ANOTHER

  int xInt = 3;
  int yInt = 2;

  //This will convert the xInt into a decimal point.
  //Remember () take precidance over most operations so the conversion will happen before the division.
  //Also just the xInt is converted in this case but a float / int will retain it's precision.
  float zFloat = (float)xInt/yInt;
  printf("Coverted Float: %f\n", zFloat);

  //POINTERS

  //Remember pointers are just memory addresses, much like a shortcut on a desktop.
  //They just point to a location where the memory of the acutal data is stored thus you need to treat them as such.

  //For example
  char* stuff = "Stuff";
  //First creates somewhere in memory a char array of the characters 'S','t','u','f','f','\0'
  //Then creates a pointer to the location of the [0] place character 'S'.
  //This pointer is not the actual char 'S' but rather the loaction of it, the pointer itself is something like 0x000022E

  //Derefrencing a pointer
  int pointE = 4;
  //Creates a new pointer to the address of the pointE
  //Note the & sign, this is used to REFRENCE datas memory loaction
  int* pointer = &pointE;

  printf("Pointer Location: %p\n", pointer);
  //Note the * sign this is used to DEREFRENCE a pointers value
  printf("Pointer Derefrenced Value: %d\n", *pointer);

  //Calling our function
  //Note in if statements anything above 0 evealuates to true and 0 is false
  if (checkPerson("Dude", 33)) printf("Person Checks Out\n");
  else printf("Person Does Not Check Out\n");

  //LOOPS

  //For Loops
  //For loops are most common when a known condition and iteration will end the loop
  //For loops are defined by an assignment, a conditional, and an executable
  //In the following we assign i to 0
  //Then our condition is if (i < 10) we continue
  //Finally our execution is after every iteration to bump i up by one
  //Note that any assignment, condition and execution can happen it does not have to be as simple as bumping numbers.
  int i = 0;
  for (i = 0; i < 10; ++i) {
    printf("For loop iteration %d\n", i);
  }

  //While Loops
  //While loops are used when mainly when you are not sure what action will break the loop or when it will happen.
  //This loop basiclly will continue untill be "break" our of it by entering 1.
  //while(1) can be thought of as simple while true continue, this is usually what you do if you know you will handle the break condition inside the loop
  //Otherwise if you want the while loop to break itself, then you include the condition inside the ()
  while(1) {
    int endLoop = 0;
    printf("End loop? (1 for yes 0 for no): ");
    scanf("%d", &endLoop);
    if (endLoop == 1) {
      break;
    }
  }

}

//FUNCTIONS
//Related lines are 7 and 103
//Here we define a function called checkPerson that takes in a char pointer and an int, and returns an int
//The goal of this function is to check if the given name and age matches our desired name and age
int checkPerson(char* name, int age) {
  char* realName = "Dude";
  int realAge = 33;

  if (realAge != age)
    return 0;
  if (strcmp(realName, name) == 0)
    return 1;
  return 0;
}
