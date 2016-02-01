#ifndef CARHELPER_H_
#define CARHELPER_H_

#include <stdio.h>
#include <stdlib.h>

typedef struct _car {
  char* name;
  char* model;
  int year;
  struct _car* next;
} Car;

Car* insertCar(Car* head, char* name, char* model, int year);
void printCars(Car* cars);
void freeCars(Car* cars);

#endif
