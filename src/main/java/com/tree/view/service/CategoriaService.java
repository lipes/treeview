package com.tree.view.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tree.view.entity.Categoria;
import com.tree.view.repository.CategoriaRepository;

@Service
public class CategoriaService {
	@Autowired
	CategoriaRepository categoriaRepository;
	
	public List<Categoria> getAll(){
		return categoriaRepository.getAll();
	}

	public int delete(Long[] ids) {
		return categoriaRepository.delete(ids);
	}

	public Categoria cadastrar(Categoria categoria) {
		return categoriaRepository.cadastrar(categoria);
	}
}
