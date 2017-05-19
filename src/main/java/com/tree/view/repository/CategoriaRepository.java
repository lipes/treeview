package com.tree.view.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tree.view.entity.Categoria;

@Repository
public class CategoriaRepository {
	
	@PersistenceContext
	private EntityManager em;
	
	private static final String LISTAR = "Select c From Categoria c where c.statusCategoria = 1 order by c.idPaiCategoria ";
	private static final String DELETE_LOGICO = "UPDATE Categoria c set c.statusCategoria = 0 where c.idCategoria IN (:ids) ";
	
	@SuppressWarnings("unchecked")
	public List<Categoria> getAll() {
		Query query = em.createQuery(LISTAR);
		return query.getResultList();
	}
	
	@Transactional
	public int delete(Long[] ids) {
		List<Long> longlist = new ArrayList<Long>();
		for (Long value : ids) {
			longlist.add(value);
		}
		
		Query query = em.createQuery(DELETE_LOGICO);
		query.setParameter("ids", Arrays.asList(ids));
		return query.executeUpdate();
	}
	
	@Transactional
	public Categoria cadastrar(Categoria categoria) {
		if(categoria.getIdCategoria() != null){
			em.find(Categoria.class, categoria.getIdCategoria());
			em.merge(categoria);
		}else{
			em.persist(categoria);
			em.flush();
		}
		return categoria;
	}
}
