package com.crud.crudprueba.product;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private float price;
    private LocalDate fecha;
    @Transient
    private int antiguedad;

    public Product() {
    }

    public Product(Long id, String nombre, float price, LocalDate fecha) {
        this.id = id;
        this.name = nombre;
        this.price = price;
        this.fecha = fecha;
    }

    public Product(String nombre, float price, LocalDate fecha) {
        this.name = nombre;
        this.price = price;
        this.fecha = fecha;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setNombre(String nombre) {
        this.name = nombre;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public int getAntiguedad() {
        if (this.fecha != null) {
            ZoneId zonaHoraria = ZoneId.systemDefault();
            ZonedDateTime fechaConZona = this.fecha.atStartOfDay(zonaHoraria);
            return Period.between(fechaConZona.toLocalDate(), LocalDate.now()).getYears();
        } else {
            return 0;
        }
    }

    public void setAntiguedad(int antiguedad) {
        this.antiguedad = antiguedad;
    }
}
