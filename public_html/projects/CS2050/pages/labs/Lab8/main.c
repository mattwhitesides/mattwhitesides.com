#include <stdio.h>
#include "carHelper.h"

int main(void) {

  Car* head = NULL;

  head = insertCar(head, "Chevy", "Impala", 2014);
  head = insertCar(head, "Ford", "Torus", 1999);
  head = insertCar(head, "BMW", "Z3", 2007);

  printCars(head);
  freeCars(head);
}
