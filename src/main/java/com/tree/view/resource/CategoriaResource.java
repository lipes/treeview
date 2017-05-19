package com.tree.view.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tree.view.entity.Categoria;
import com.tree.view.service.CategoriaService;

@Controller
public class CategoriaResource {
	@Autowired
	CategoriaService categoriaService;
	
	@RequestMapping(path="/categorias", method=RequestMethod.GET)
	@ResponseBody
	public List<Categoria> getCategorias(){
		return categoriaService.getAll();
	}
	
	@RequestMapping(value="/categorias", method = RequestMethod.DELETE)
	@ResponseBody
	public int excluir(@RequestBody Long[] array) {
		return categoriaService.delete(array);
	}
	
	@RequestMapping(value="/categorias", method = RequestMethod.POST)
	@ResponseBody
	public Categoria cadastrar(@RequestBody Categoria categoria) {
		return categoriaService.cadastrar(categoria);
	}
}
