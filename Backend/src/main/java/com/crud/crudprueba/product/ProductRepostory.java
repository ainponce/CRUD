package com.crud.crudprueba.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepostory extends JpaRepository<Product, Long>{

    Optional<Product> findProductByName(String name);
}
