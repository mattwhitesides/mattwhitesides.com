#include <stdio.h>
#include <stdlib.h>

struct Person {
  char* name;
  int age;
  float height;
};

int main(int argc, char* argv[]) {

  struct Person joe = {"Joe", 22, 10.5};

  struct Person jill;
  jill.name = "Jill";
  jill.age = 11;
  jill.height = 3.333;

  struct Person people[3];

  people[0].name = "Jake";
  (people + 0)->age = 22;
  (*(people + 0)).height = 3.333;


  printf("%s\n", jill.name);
  printf("%d\n\n", joe.age);

  return 0;
}
