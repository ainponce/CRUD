package com.crud.crudprueba.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(){
        return this.productService.getProducts();
    }

    @PostMapping
    public ResponseEntity<Object> registerNewProduct(@RequestBody Product product){
        return this.productService.addNewProduct(product);
    }

    @PutMapping
    public ResponseEntity<Object> updateProduct(@RequestBody Product product){
        return this.productService.addNewProduct(product);
    }

    @DeleteMapping(path = "{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId){
        return this.productService.deleteProduct(productId);
    }
}
