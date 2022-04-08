package edu.princeton.cs.algs4;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import edu.princeton.cs.algs4.GraphGenerator;
import edu.princeton.cs.algs4.Graph;

import java.util.Iterator;

import static org.junit.Assert.*;

/**
 * Created by charles-olivierpresario on 2017-09-20.
 */
public class GraphGeneratorTest {

    private int V;
    private int E;
    private int V1;
    private int V2;
    private int K;


    @Before
    public void setUp() throws Exception {
        V = 12;
        E = 2;
        V1 = V/2;
        V2 = V - V1;
        K = 8;
    }

    @After
    public void tearDown() throws Exception {

    }


    /////////////////////////////////////////////////////
    //   TP2 Tests Boite Noire
    /////////////////////////////////////////////////////

    @Test
    public void testBipartiteProbabiliteEC() {
        int v1;
        int v2;
        double q;

        //Cas de test 1

        v1 = 0;
        v2 = 0;
        q = 0;

        Graph graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());


        //Cas de test 2

        v1 = 1;
        v2 = 1;
        q = 0.5;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test 3

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE;
        q = 0;

       graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

    }

    @Test
    public void testSimpleEC() throws Exception {

        //Cas 0,1
        Graph graph1 = GraphGenerator.simple(0,1);
        assertEquals("Le graph n'est pas de type simple.","simple", graph1.getTypeName());
    }

    @Test
    public void testSimpleAC() throws Exception {

        //Cas 0,0
        Graph graph1 = GraphGenerator.simple(0, 0);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph1.getTypeName());

        //Cas 0,1
        Graph graph2 = GraphGenerator.simple(0, 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph2.getTypeName());

        //Cas 0,Integer.MAX_VALUE -1
        Graph graph3 = GraphGenerator.simple(0, Integer.MAX_VALUE - 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph3.getTypeName());

        //Cas 0,Integer.MAX_VALUE
        Graph graph4 = GraphGenerator.simple(0, Integer.MAX_VALUE);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph4.getTypeName());

        //Cas 1,0
        Graph graph5 = GraphGenerator.simple(1, 0);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph5.getTypeName());

        //Cas 1,1
        Graph graph6 = GraphGenerator.simple(1, 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph6.getTypeName());

        //Cas 1,Integer.MAX_VALUE -1
        Graph graph7 = GraphGenerator.simple(1, Integer.MAX_VALUE - 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph7.getTypeName());

        //Cas 1,Integer.MAX_VALUE
        Graph graph8 = GraphGenerator.simple(1, Integer.MAX_VALUE);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph8.getTypeName());

        //Cas Integer.MAX_VALUE -1,0
        Graph graph9 = GraphGenerator.simple(Integer.MAX_VALUE - 1, 0);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph9.getTypeName());

        //Cas Integer.MAX_VALUE -1, 1
        Graph graph10 = GraphGenerator.simple(Integer.MAX_VALUE - 1, 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph10.getTypeName());

        //Cas Integer.MAX_VALUE -1, Integer.MAX_VALUE -1
        Graph graph11 = GraphGenerator.simple(Integer.MAX_VALUE - 1, Integer.MAX_VALUE - 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph11.getTypeName());

        //Cas Integer.MAX_VALUE -1, Integer.MAX_VALUE
        Graph graph12 = GraphGenerator.simple(Integer.MAX_VALUE - 1, Integer.MAX_VALUE);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph12.getTypeName());

        //Cas Integer.MAX_VALUE, 0
        Graph graph13 = GraphGenerator.simple(Integer.MAX_VALUE, 0);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph13.getTypeName());

        //Cas Integer.MAX_VALUE, 1
        Graph graph14 = GraphGenerator.simple(Integer.MAX_VALUE, 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph14.getTypeName());

        //Cas Integer.MAX_VALUE, Integer.MAX_VALUE -1
        Graph graph15 = GraphGenerator.simple(Integer.MAX_VALUE, Integer.MAX_VALUE - 1);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph15.getTypeName());

        //Cas Integer.MAX_VALUE, Integer.MAX_VALUE
        Graph graph16 = GraphGenerator.simple(Integer.MAX_VALUE, Integer.MAX_VALUE);
        assertEquals("Le graph n'est pas de type simple.", "simple", graph16.getTypeName());

    }


    @Test
        public void testBipartiteProbabiliteAC() {
        int v1;
        int v2;
        double q;

        //Cas de test

        v1 = 0;
        v2 = 0;
        q = 0;

        Graph graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = 0;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = 0;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = 0;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());


        //Cas de test

        v1 = 0;
        v2 = 1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());


        //Cas de test

        v1 = 0;
        v2 = 1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = 1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = 1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE-1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE-1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE-1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE-1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 0;
        v2 = Integer.MAX_VALUE;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 0;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 0;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 0;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 0;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = 1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE-1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE-1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE-1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE-1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = 1;
        v2 = Integer.MAX_VALUE;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 0;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 0;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 0;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 0;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = 1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE-1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE-1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE-1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE-1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE-1;
        v2 = Integer.MAX_VALUE;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 0;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 0;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 0;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 0;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = 1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE-1;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE-1;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE-1;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE-1;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE;
        q = 0;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE;
        q = 0.1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE;
        q = 0.9;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

        //Cas de test

        v1 = Integer.MAX_VALUE;
        v2 = Integer.MAX_VALUE;
        q = 1;

        graph = GraphGenerator.bipartite(v1, v2, q);
        assertEquals("Le graph n'est pas de type bipartite.","bipartite", graph.getTypeName());

    }

    @Test
        public void testRegularEC() throws Exception {

            //Cas 0,1
            Graph graph1 = GraphGenerator.regular(0,1);
            assertEquals("Le graph n'est pas de type simple.","simple", graph1.getTypeName());
        }

        @Test
        public void testRegularAC() throws Exception {

            //Cas 0,0
            Graph graph1 = GraphGenerator.regular(0,0);
            assertEquals("Le graph n'est pas de type regular.","regular", graph1.getTypeName());

            //Cas 0,1
            Graph graph2 = GraphGenerator.regular(0,1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph2.getTypeName());

            //Cas 0,Integer.MAX_VALUE -1
            Graph graph3 = GraphGenerator.regular(0,Integer.MAX_VALUE -1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph3.getTypeName());

            //Cas 0,Integer.MAX_VALUE
            Graph graph4 = GraphGenerator.regular(0,Integer.MAX_VALUE);
            assertEquals("Le graph n'est pas de type regular.","regular", graph4.getTypeName());

            //Cas 1,0
            Graph graph5 = GraphGenerator.regular(1,0);
            assertEquals("Le graph n'est pas de type regular.","regular", graph5.getTypeName());

            //Cas 1,1
            Graph graph6 = GraphGenerator.regular(1,1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph6.getTypeName());

            //Cas 1,Integer.MAX_VALUE -1
            Graph graph7 = GraphGenerator.regular(1,Integer.MAX_VALUE -1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph7.getTypeName());

            //Cas 1,Integer.MAX_VALUE
            Graph graph8 = GraphGenerator.regular(1,Integer.MAX_VALUE);
            assertEquals("Le graph n'est pas de type regular.","regular", graph8.getTypeName());

            //Cas Integer.MAX_VALUE -1,0
            Graph graph9 = GraphGenerator.regular(Integer.MAX_VALUE -1,0);
            assertEquals("Le graph n'est pas de type regular.","regular", graph9.getTypeName());

            //Cas Integer.MAX_VALUE -1, 1
            Graph graph10 = GraphGenerator.regular(Integer.MAX_VALUE -1,1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph10.getTypeName());

            //Cas Integer.MAX_VALUE -1, Integer.MAX_VALUE -1
            Graph graph11 = GraphGenerator.regular(Integer.MAX_VALUE -1,Integer.MAX_VALUE -1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph11.getTypeName());

            //Cas Integer.MAX_VALUE -1, Integer.MAX_VALUE
            Graph graph12 = GraphGenerator.regular(Integer.MAX_VALUE -1,Integer.MAX_VALUE);
            assertEquals("Le graph n'est pas de type regular.","regular", graph12.getTypeName());

            //Cas Integer.MAX_VALUE, 0
            Graph graph13 = GraphGenerator.regular(Integer.MAX_VALUE,0);
            assertEquals("Le graph n'est pas de type regular.","regular", graph13.getTypeName());

            //Cas Integer.MAX_VALUE, 1
            Graph graph14 = GraphGenerator.regular(Integer.MAX_VALUE,1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph14.getTypeName());

            //Cas Integer.MAX_VALUE, Integer.MAX_VALUE -1
            Graph graph15 = GraphGenerator.regular(Integer.MAX_VALUE,Integer.MAX_VALUE -1);
            assertEquals("Le graph n'est pas de type regular.","regular", graph15.getTypeName());

            //Cas Integer.MAX_VALUE, Integer.MAX_VALUE
            Graph graph16 = GraphGenerator.regular(Integer.MAX_VALUE,Integer.MAX_VALUE);
            assertEquals("Le graph n'est pas de type regular.","regular", graph16.getTypeName());

        }



    /////////////////////////////////////////////////////
    //   TP3 Tests Boite Blanche
    /////////////////////////////////////////////////////



    @Test
    public void testWhiteBox() throws Exception {


    }







}