package com.crud.crudprueba.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    HashMap<String, Object> response;

    private final ProductRepostory productRepostory;

    @Autowired
    public ProductService(ProductRepostory productRepostory) {
        this.productRepostory = productRepostory;
    }

    public List<Product> getProducts(){
        return productRepostory.findAll();
    }

    public ResponseEntity<Object> addNewProduct(Product product) {
        Optional<Product> res = productRepostory.findProductByName(product.getName());
        response = new HashMap<>();
        if(res.isPresent() && product.getId()==null){
            response.put("error", true);
            response.put("message", "El producto ya existe");
            return new ResponseEntity<>(
                    response,
                    HttpStatus.CONFLICT
            );
        }
        response.put("message", "Se guardó con exito");
        if(product.getId()!=null){
            response.put("message", "Se actualizó con exito");
        }
        productRepostory.save(product);
        response.put("data", product);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    public ResponseEntity<Object> deleteProduct(Long productId) {
        response = new HashMap<>();
        boolean exists = productRepostory.existsById(productId);
        if(!exists){
            response.put("error", true);
            response.put("message", "No existe un producto con ese id");
            return new ResponseEntity<>(
                    response,
                    HttpStatus.CONFLICT
            );
        }
        productRepostory.deleteById(productId);
        response.put("message", "Producto eliminado con exito");
        return new ResponseEntity<>(
                response,
                HttpStatus.ACCEPTED
        );
    }
}
