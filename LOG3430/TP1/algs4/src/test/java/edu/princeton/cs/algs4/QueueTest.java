package edu.princeton.cs.algs4;


import static org.junit.Assert.*;

/**
 * Created by charles-olivierpresario on 2017-11-13.
 */
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


import edu.princeton.cs.algs4.Queue;

import java.util.Iterator;
import java.util.NoSuchElementException;

import static org.junit.Assert.*;

public class QueueTest {
    private int n;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }


    /////////////////////////////////////////////////////////////////////////////////
    // TP5 commence ici
    /////////////////////////////////////////////////////////////////////////////////

    @Test
    public void sequenceFirst1() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("first devrait etre null ", null, q.getFirst());
        q.enqueue(item1);
        assertEquals("first devrait etre : test ", "test", q.getFirst());
        assertEquals("first devrait etre : test ", "test", q.dequeue());
        assertEquals("first devrait etre : null ", null, q.getFirst());

        assertEquals("La fonction isEmpty() devrait retourner true.", true, q.isEmpty());
        try {
            q.peek();
            fail("My method didn't throw when I expected it to");
        } catch (NoSuchElementException expectedException) {
        }
        assertEquals("toString devrait retourner une chaine vide  ", "", q.toString());

    }


    @Test
    public void sequenceFirst2() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("first devrait etre null ", null, q.getFirst());
        try {
            q.dequeue();
            fail("My method didn't throw when I expected it to");
        } catch (NoSuchElementException expectedException) {
        }

        assertEquals("first devrait etre : null ", null, q.getFirst());

        q.enqueue(item1);

        assertEquals("first devrait etre : test ", "test", q.getFirst());

        assertEquals("La fonction isEmpty() devrait retourner false.", false, q.isEmpty());

        assertEquals("La fonction peek() devrait retourner test.", "test", q.peek());
    }


    @Test
    public void sequenceLast1() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("last devrait etre null ", null, q.getLast());
        q.enqueue(item1);
        assertEquals("last devrait etre : test ", "test", q.getLast());
        assertEquals("last devrait etre : test ", "test", q.dequeue());
        assertEquals("last devrait etre : null ", null, q.getLast());

        assertEquals("La fonction isEmpty() devrait retourner true.", true, q.isEmpty());
        assertEquals("toString devrait retourner une chaine vide  ", "", q.toString());
        assertEquals("toString devrait retourner la chaine vide ", "", q.toString());
    }

    @Test
    public void sequenceLast2() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("last devrait etre null ", null, q.getLast());
        try {
            q.dequeue();
            fail("My method didn't throw when I expected it to");
        } catch (NoSuchElementException expectedException) {
        }
        assertEquals("last devrait etre null ", null, q.getLast());
        q.enqueue(item1);
        assertEquals("last devrait etre : test ", "test", q.getLast());
        assertEquals("La fonction isEmpty() devrait retourner false.", false, q.isEmpty());
        assertEquals("toString devrait retourner test ", "test ", q.toString());
    }

    @Test
    public void sequenceN1() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("size devrait etre 0 ", 0, q.size());
        q.enqueue(item1);
        assertEquals("size devrait etre 1 ", 1, q.size());
        assertEquals("size devrait etre : test ", "test", q.dequeue());
        assertEquals("size devrait etre 0 ", 0, q.size());
        assertEquals("toString devrait retourner une chaine vide  ", "", q.toString());

    }

    @Test
    public void sequenceN2() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        assertEquals("size devrait etre 0 ", 0, q.size());
        try {
            q.dequeue();
            fail("My method didn't throw when I expected it to");
        } catch (NoSuchElementException expectedException) {
        }
        assertEquals("size devrait etre 0 ", 0, q.size());
        q.enqueue(item1);
        assertEquals("size devrait etre 1 ", 1, q.size());
        assertEquals("toString devrait retourner test ", "test ", q.toString());

    }


    @Test
    public void testBoiteBlanche() {
        Queue<String> q = new Queue<String>();
        String item1 = "test";
        String item2 = "test2";

        q.enqueue(item1);
        q.enqueue(item2);
        assertEquals("last devrait etre test ", "test", q.getFirst());
        assertEquals("last devrait etre test2 ", "test2", q.getLast());

    }
}